"use client";

import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

export default function LanguageMenu({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const label = {
    my: "မြန်မာ",
    zh: "中文",
    en: "EN",
  };

  /**
   * 切换语言时保留当前页面路径。
   * 例如：
   * /my/admin/users → /zh/admin/users
   */
  function switchLocale(nextLocale: "my" | "zh" | "en") {
    const parts = pathname.split("/");

    parts[1] = nextLocale;

    router.push(parts.join("/") || `/${nextLocale}`);
    setOpen(false);
  }

  useEffect(() => {
    function close(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", close);

    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, []);

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "transparent",
          border: "1px solid #e2e8f0",
          borderRadius: "999px",
          padding: "8px 12px",
          color: "inherit",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        {label[locale as keyof typeof label] || "EN"} ▾
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "42px",
            width: "140px",
            background: "white",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
            overflow: "hidden",
            zIndex: 999,
          }}
        >
          <LangButton label="မြန်မာ" onClick={() => switchLocale("my")} />
          <LangButton label="中文" onClick={() => switchLocale("zh")} />
          <LangButton label="English" onClick={() => switchLocale("en")} />
        </div>
      )}
    </div>
  );
}

function LangButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        padding: "12px 14px",
        color: "#0f172a",
        background: "white",
        border: "none",
        borderBottom: "1px solid #f1f5f9",
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}