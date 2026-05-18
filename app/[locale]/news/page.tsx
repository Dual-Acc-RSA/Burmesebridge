"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Category = "news" | "jobs" | "learn";

type NewsItem = {
  id: number;
  title: string;
  content: string;
  locale: string | null;
  status: string | null;
  category: Category | null;
  created_at: string;
};

export default function NewsPage() {
  const params = useParams();
  const locale = String(params.locale || "my");

  const text = {
    my: {
      title: "သတင်းအချက်အလက်",
      subtitle: "သတင်း၊ အလုပ်အကိုင် နှင့် လေ့လာရေး အချက်အလက်များ",
      empty: "လက်ရှိ ထုတ်ပြန်ထားသော အချက်အလက် မရှိသေးပါ",
      news: "သတင်း",
      jobs: "အလုပ်အကိုင်",
      learn: "လေ့လာရန်",
      lang: "ဘာသာစကား",
    },
    zh: {
      title: "信息中心",
      subtitle: "新闻、工作信息和学习内容",
      empty: "暂无发布内容",
      news: "新闻",
      jobs: "工作信息",
      learn: "学习内容",
      lang: "语言",
    },
    en: {
      title: "Information Center",
      subtitle: "News, jobs, and learning updates",
      empty: "No published content yet",
      news: "News",
      jobs: "Jobs",
      learn: "Learning",
      lang: "Language",
    },
  };

  const t = text[locale as keyof typeof text] || text.en;

  const [items, setItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const { data, error } = await supabase
      .from("news")
      .select("id, title, content, locale, status, category, created_at")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setItems((data || []) as NewsItem[]);
  }

  function getCategoryLabel(category: Category | null) {
    if (category === "jobs") return t.jobs;
    if (category === "learn") return t.learn;
    return t.news;
  }

  function getCategoryStyle(category: Category | null) {
    if (category === "jobs") {
      return {
        background: "#fff7ed",
        color: "#c2410c",
        border: "1px solid #fed7aa",
      };
    }

    if (category === "learn") {
      return {
        background: "#f5f3ff",
        color: "#6d28d9",
        border: "1px solid #ddd6fe",
      };
    }

    return {
      background: "#eff6ff",
      color: "#2563eb",
      border: "1px solid #bfdbfe",
    };
  }

  return (
    <main className="feedShell">
      <h1 className="feedTitle">{t.title}</h1>

      <p
        style={{
          color: "#64748b",
          fontSize: 18,
          marginBottom: 28,
          lineHeight: 1.8,
        }}
      >
        {t.subtitle}
      </p>

      <div style={{ display: "grid", gap: 18 }}>
        {items.length === 0 && (
          <div className="feedCard" style={{ color: "#64748b" }}>
            {t.empty}
          </div>
        )}

        {items.map((item) => (
          <article
            key={item.id}
            className="feedCard"
            style={{
              padding: 28,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "7px 12px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 800,
                marginBottom: 18,
                ...getCategoryStyle(item.category),
              }}
            >
              {getCategoryLabel(item.category)}
            </div>

            <h2
              style={{
                fontSize: 30,
                marginBottom: 14,
                color: "#0f172a",
              }}
            >
              {item.title}
            </h2>

            <p
              style={{
                color: "#334155",
                lineHeight: 1.9,
                whiteSpace: "pre-wrap",
                fontSize: 17,
              }}
            >
              {item.content}
            </p>

            <div
              style={{
                marginTop: 22,
                paddingTop: 16,
                borderTop: "1px solid #e2e8f0",
                color: "#94a3b8",
                fontSize: 14,
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <span>{new Date(item.created_at).toLocaleString()}</span>

              {item.locale && (
                <span>
                  {t.lang}: {item.locale}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}