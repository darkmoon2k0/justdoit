import { useEffect, useState } from "react";

export default function Theme() {
  const [dark, setDark] = useState(false);

  // Load từ localStorage khi vào trang
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Mỗi khi đổi theme → lưu vào localStorage
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="flex justify-end">
      <div
        onClick={() => setDark(!dark)}
        className="relative w-20 h-10 flex items-center rounded-full cursor-pointer bg-gray-300 dark:bg-gray-800 transition-colors"
      >
        {/* icon sun & moon */}
        <div className="w-full flex justify-between px-3 text-lg">
          <span className="text-yellow-500">☀️</span>
          <span className="text-blue-400">🌙</span>
        </div>

        {/* nút tròn xanh highlight icon active */}
        <div
          className={`
            absolute top-1 left-1 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white
            transition-transform
            ${dark ? "translate-x-10" : "translate-x-0"}
          `}
        >
          {dark ? "🌙" : "☀️"}
        </div>
      </div>
    </div>
  );
}
