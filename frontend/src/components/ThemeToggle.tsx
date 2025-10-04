import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function ThemeToggle() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const knobRef  = useRef<HTMLDivElement | null>(null);

  const SUN  = "☀︎"; // U+2600 + FE0E (text)
  const MOON = "☾";  // U+263E (text)

  const [dark, setDark] = useState(false);
  const [previewDark, setPreviewDark] = useState<boolean | null>(null);
  const [dragging, setDragging] = useState(false);

  const [tx, setTx] = useState(0);
  const [maxTx, setMaxTx] = useState(0);
  const [half,  setHalf]  = useState(0);

  // đo kích thước
  const measure = () => {
    if (!trackRef.current || !knobRef.current) return;
    const track = trackRef.current;
    const knob  = knobRef.current;
    const trackRect = track.getBoundingClientRect();
    const knobRect  = knob.getBoundingClientRect();
    const leftPad   = knob.offsetLeft;                  // = 2px (top/left-[2px])
    const max = trackRect.width - knobRect.width - leftPad * 2;
    setMaxTx(max);
    setHalf(max / 2);
    setTx((previewDark ?? dark) ? max : 0);
  };

  useLayoutEffect(() => {
    measure();
    if (!trackRef.current) return;
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [dark, previewDark]);

  // init theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    setDark(isDark);
  }, []);

  // apply theme
  useEffect(() => {
    const applied = dragging ? (previewDark ?? dark) : dark;
    document.documentElement.classList.toggle("dark", applied);
  }, [dark, dragging, previewDark]);

  // save storage
  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const clamp  = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));
  const commit = (toDark: boolean) => {
    setDark(toDark);
    setPreviewDark(null);
    setTx(toDark ? maxTx : 0);
  };

  // drag
  const onKnobPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    setPreviewDark(dark);
    knobRef.current?.setPointerCapture(e.pointerId);
  };
  const onKnobPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !trackRef.current || !knobRef.current) return;
    const rect  = trackRef.current.getBoundingClientRect();
    const knobW = knobRef.current.getBoundingClientRect().width;
    const x = e.clientX - rect.left - knobW / 2;
    const clamped = clamp(x, 0, maxTx);
    setTx(clamped);
    setPreviewDark(clamped >= half);
  };
  const finishDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    try { if (e) knobRef.current?.releasePointerCapture(e.pointerId); } catch {
      // Intentionally left empty
    }
    setDragging(false);
    commit(previewDark ?? (tx >= half));
  };

  // click
  const onTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging || !trackRef.current || !knobRef.current) return;
    const rect  = trackRef.current.getBoundingClientRect();
    const knobW = knobRef.current.getBoundingClientRect().width;
    const x = e.clientX - rect.left - knobW / 2;
    const clamped = clamp(x, 0, maxTx);
    commit(clamped >= half);
  };

  return (
    <div className="flex justify-end">
      <div
        ref={trackRef}
        onClick={onTrackClick}
        role="switch"
        aria-checked={dragging ? (previewDark ?? dark) : dark}
        className={`relative w-17 h-9  rounded-full cursor-pointer select-none border-0
                    ${dark ? "bg-purple-900" : "bg-white "}`}
      >
        {/* Icon ☀️ 🌙 — padding nhỏ để không dư khoảng trắng */}
        <div className="absolute inset-0 flex items-center justify-between px-2 text-[20px] pointer-events-none">
          <span className={`${dark ? "opacity-30" : "opacity-100"} transition-opacity`}>{SUN}</span>
          <span className={`${dark ? "opacity-100" : "opacity-30"} transition-opacity`}>{MOON}</span>
        </div>

        {/* Knob: to/[2px] left/[2px], size 36px (sát hơn, cân đối) */}
        <div
          ref={knobRef}
          onPointerDown={onKnobPointerDown}
          onPointerMove={onKnobPointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onPointerLeave={finishDrag}
          className={`absolute w-[36px] h-[36px] rounded-full grid place-items-center text-[20px]
                      ${dragging ? "" : "transition-transform duration-200"}
                      ${dark ? "bg-purple-500 text-white" : "bg-yellow-100 text-yellow-600"}`}
          style={{ transform: `translateX(${tx}px)` }}
        >
          {(dragging ? (previewDark ?? dark) : dark) ? MOON : SUN}
        </div>
      </div>
    </div>
  );
}
