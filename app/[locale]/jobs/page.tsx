"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Item = {
  id: number;
  title_my: string | null;
  title_zh: string | null;
  title_en: string | null;
  content_my: string | null;
  content_zh: string | null;
  content_en: string | null;
  created_at: string;
};

export default function JobsPage() {
  const params = useParams();
  const locale = String(params.locale || "my");

  const t = {
    my: { title: "အလုပ်အကိုင်", empty: "အလုပ်အကိုင် အချက်အလက် မရှိသေးပါ" },
    zh: { title: "工作信息", empty: "暂无工作信息" },
    en: { title: "Jobs", empty: "No jobs yet" },
  }[locale as "my" | "zh" | "en"] || {
    title: "Jobs",
    empty: "No jobs yet",
  };

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const { data, error } = await supabase
      .from("news")
      .select("id, title_my, title_zh, title_en, content_my, content_zh, content_en, created_at")
      .eq("status", "published")
      .eq("category", "jobs")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setItems((data || []) as Item[]);
  }

  function getTitle(item: Item) {
    if (locale === "zh") return item.title_zh || item.title_my || item.title_en || "";
    if (locale === "en") return item.title_en || item.title_my || item.title_zh || "";
    return item.title_my || item.title_zh || item.title_en || "";
  }

  function getContent(item: Item) {
    if (locale === "zh") return item.content_zh || item.content_my || item.content_en || "";
    if (locale === "en") return item.content_en || item.content_my || item.content_zh || "";
    return item.content_my || item.content_zh || item.content_en || "";
  }

  return (
    <main className="feedShell">
      <h1 className="feedTitle">{t.title}</h1>

      <div style={{ display: "grid", gap: 18 }}>
        {items.length === 0 && <div className="feedCard">{t.empty}</div>}

        {items.map((item) => (
          <article key={item.id} className="feedCard">
            <h2>{getTitle(item)}</h2>
            <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.9 }}>
              {getContent(item)}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}