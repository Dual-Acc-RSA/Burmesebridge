"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";

type Category = "news" | "jobs" | "learn";

type NewsItem = {
  id: number;
  category: Category | null;
  title_my: string | null;
  title_zh: string | null;
  title_en: string | null;
  content_my: string | null;
  content_zh: string | null;
  content_en: string | null;
  created_at: string;
};

export default function AdminNewsPage() {
  return (
    <AdminGuard>
      <NewsContent />
    </AdminGuard>
  );
}

function NewsContent() {
  const params = useParams();
  const locale = String(params.locale || "my");

  const text = {
    my: {
      pageTitle: "အချက်အလက် ထုတ်ပြန်ရန်",
      category: "အမျိုးအစား",
      news: "သတင်း",
      jobs: "အလုပ်အကိုင်",
      learn: "လေ့လာရန်",
      titleMy: "မြန်မာ ခေါင်းစဉ်",
      titleZh: "中文标题",
      titleEn: "English Title",
      contentMy: "မြန်မာ အကြောင်းအရာ",
      contentZh: "中文内容",
      contentEn: "English Content",
      publish: "ထုတ်ပြန်ရန်",
      delete: "ဖျက်ရန်",
      empty: "ထုတ်ပြန်ထားသော အချက်အလက် မရှိသေးပါ",
      confirmDelete: "ဒီအချက်အလက်ကို ဖျက်မှာ သေချာပါသလား?",
    },
    zh: {
      pageTitle: "发布信息",
      category: "类型",
      news: "新闻",
      jobs: "工作信息",
      learn: "学习内容",
      titleMy: "缅语标题",
      titleZh: "中文标题",
      titleEn: "英文标题",
      contentMy: "缅语内容",
      contentZh: "中文内容",
      contentEn: "英文内容",
      publish: "发布",
      delete: "删除",
      empty: "暂无已发布信息",
      confirmDelete: "确定要删除这条信息吗？",
    },
    en: {
      pageTitle: "Publish",
      category: "Category",
      news: "News",
      jobs: "Jobs",
      learn: "Learning",
      titleMy: "Myanmar Title",
      titleZh: "Chinese Title",
      titleEn: "English Title",
      contentMy: "Myanmar Content",
      contentZh: "Chinese Content",
      contentEn: "English Content",
      publish: "Publish",
      delete: "Delete",
      empty: "No published items yet",
      confirmDelete: "Delete this item?",
    },
  };

  const t = text[locale as keyof typeof text] || text.en;

  const [items, setItems] = useState<NewsItem[]>([]);
  const [category, setCategory] = useState<Category>("news");

  const [titleMy, setTitleMy] = useState("");
  const [titleZh, setTitleZh] = useState("");
  const [titleEn, setTitleEn] = useState("");

  const [contentMy, setContentMy] = useState("");
  const [contentZh, setContentZh] = useState("");
  const [contentEn, setContentEn] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const { data, error } = await supabase
      .from("news")
      .select(
        "id, category, title_my, title_zh, title_en, content_my, content_zh, content_en, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setItems((data || []) as NewsItem[]);
  }

  async function createNews() {
    if (!titleMy.trim() && !titleZh.trim() && !titleEn.trim()) return;
    if (!contentMy.trim() && !contentZh.trim() && !contentEn.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const fallbackTitle = titleMy || titleZh || titleEn;
    const fallbackContent = contentMy || contentZh || contentEn;

    const { error } = await supabase.from("news").insert({
      category,
      locale,
      status: "published",
      source_language: locale,
      author_id: user?.id || null,

      title: fallbackTitle,
      content: fallbackContent,

      title_my: titleMy || fallbackTitle,
      title_zh: titleZh || fallbackTitle,
      title_en: titleEn || fallbackTitle,

      content_my: contentMy || fallbackContent,
      content_zh: contentZh || fallbackContent,
      content_en: contentEn || fallbackContent,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setCategory("news");
    setTitleMy("");
    setTitleZh("");
    setTitleEn("");
    setContentMy("");
    setContentZh("");
    setContentEn("");

    await loadItems();
  }

  async function deleteNews(newsId: number) {
    const ok = confirm(t.confirmDelete);
    if (!ok) return;

    const { error } = await supabase.from("news").delete().eq("id", newsId);

    if (error) {
      alert(error.message);
      return;
    }

    await loadItems();
  }

  function getCategoryLabel(value: Category | null) {
    if (value === "jobs") return t.jobs;
    if (value === "learn") return t.learn;
    return t.news;
  }

  return (
    <div className="adminShell">
      <AdminSidebar />

      <div className="adminContent">
        <h1>{t.pageTitle}</h1>

        <div className="feedCard" style={{ marginTop: 24 }}>
          <label style={label}>{t.category}</label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as Category)}
            style={input}
          >
            <option value="news">{t.news}</option>
            <option value="jobs">{t.jobs}</option>
            <option value="learn">{t.learn}</option>
          </select>

          <input value={titleMy} onChange={(e) => setTitleMy(e.target.value)} placeholder={t.titleMy} style={input} />
          <textarea value={contentMy} onChange={(e) => setContentMy(e.target.value)} placeholder={t.contentMy} style={textarea} />

          <input value={titleZh} onChange={(e) => setTitleZh(e.target.value)} placeholder={t.titleZh} style={input} />
          <textarea value={contentZh} onChange={(e) => setContentZh(e.target.value)} placeholder={t.contentZh} style={textarea} />

          <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder={t.titleEn} style={input} />
          <textarea value={contentEn} onChange={(e) => setContentEn(e.target.value)} placeholder={t.contentEn} style={textarea} />

          <button onClick={createNews} style={button}>
            {t.publish}
          </button>
        </div>

        <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
          {items.length === 0 && <div className="feedCard">{t.empty}</div>}

          {items.map((item) => (
            <div key={item.id} className="feedCard">
              <strong>{getCategoryLabel(item.category)}</strong>
              <h3 style={{ marginTop: 10 }}>
                {item.title_my || item.title_zh || item.title_en}
              </h3>

              <button
                onClick={() => deleteNews(item.id)}
                style={{ ...button, background: "#ef4444", marginTop: 14 }}
              >
                {t.delete}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const label = {
  display: "block",
  fontWeight: 800,
  marginBottom: 8,
};

const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid #e2e8f0",
  marginBottom: 12,
};

const textarea = {
  width: "100%",
  minHeight: 110,
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid #e2e8f0",
  marginBottom: 12,
};

const button = {
  border: "none",
  background: "#2563eb",
  color: "white",
  padding: "10px 16px",
  borderRadius: 999,
  cursor: "pointer",
  fontWeight: 700,
};