import type { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen w-full bg-[#fefcff] dark:bg-zinc-900 relative transition-colors duration-500">
      {children}
      <div
        className="absolute dark:hidden inset-0 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
            radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />

      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, 
            rgba(147, 51, 234, 0.2) 0%, 
            rgba(147, 51, 234, 0.12) 25%, 
            rgba(147, 51, 234, 0.05) 35%, 
            transparent 50%
            )
          `,
          backgroundSize: "100% 100%",
        }}
      />
    </div>
  );
}
