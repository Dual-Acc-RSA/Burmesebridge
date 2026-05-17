"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";

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
      titlePlaceholder: "ခေါင်းစဉ်ရေးပါ...",
      contentPlaceholder: "အကြောင်းအရာရေးပါ...",
      publish: "ထုတ်ပြန်ရန်",
      delete: "ဖျက်ရန်",
      confirmDelete: "ဒီအချက်အလက်ကို ဖျက်မှာ သေချာပါသလား?",
      empty: "ထုတ်ပြန်ထားသော အချက်အလက် မရှိသေးပါ",
      category: "အမျိုးအစား",
      news: "သတင်း",
      jobs: "အလုပ်အကိုင်",
      learn: "လေ့လာရန်",
    },
    zh: {
      pageTitle: "发布信息",
      titlePlaceholder: "填写标题...",
      contentPlaceholder: "填写内容...",
      publish: "发布",
      delete: "删除",
      confirmDelete: "确定要删除这条信息吗？",
      empty: "暂无已发布信息",
      category: "类型",
      news: "新闻",
      jobs: "工作信息",
      learn: "学习内容",
    },
    en: {
      pageTitle: "Publish",
      titlePlaceholder: "Write title...",
      contentPlaceholder: "Write content...",
      publish: "Publish",
      delete: "Delete",
      confirmDelete: "Delete this item?",
      empty: "No published items yet",
      category: "Category",
      news: "News",
      jobs: "Jobs",
      learn: "Learning",
    },
  };

  const t = text[locale as keyof typeof text] || text.en;

  const [news, setNews] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category>("news");

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    const { data, error } = await supabase
      .from("news")
      .select("id, title, content, locale, status, category, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setNews((data || []) as NewsItem[]);
  }

  async function createNews() {
    if (!title.trim() || !content.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("news").insert({
      title: title.trim(),
      content: content.trim(),
      locale,
      status: "published",
      category,
      author_id: user?.id || null,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setContent("");
    setCategory("news");
    await loadNews();
  }

  async function deleteNews(newsId: number) {
    const ok = confirm(t.confirmDelete);

    if (!ok) return;

    const { error } = await supabase.from("news").delete().eq("id", newsId);

    if (error) {
      alert(error.message);
      return;
    }

    await loadNews();
  }

  function getCategoryLabel(value: Category | null) {
    if (value === "jobs") return t.jobs;
    if (value === "learn") return t.learn;
    return t.news;
  }

  function getCategoryStyle(value: Category | null) {
    if (value === "jobs") {
      return {
        background: "#fff7ed",
        color: "#c2410c",
        border: "1px solid #fed7aa",
      };
    }

    if (value === "learn") {
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
    <div className="adminShell">
      <AdminSidebar />

      <div className="adminContent">
        <h1>{t.pageTitle}</h1>

        <div className="feedCard" style={{ marginTop: 24 }}>
          <label style={label}>{t.category}</label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as Category)}
            style={select}
          >
            <option value="news">{t.news}</option>
            <option value="jobs">{t.jobs}</option>
            <option value="learn">{t.learn}</option>
          </select>

          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={t.titlePlaceholder}
            style={input}
          />

          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={t.contentPlaceholder}
            style={textarea}
          />

          <button onClick={createNews} style={button}>
            {t.publish}
          </button>
        </div>

        <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
          {news.length === 0 && (
            <div className="feedCard" style={{ color: "#64748b" }}>
              {t.empty}
            </div>
          )}

          {news.map((item) => (
            <div key={item.id} className="feedCard">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "6px 10px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 800,
                  marginBottom: 12,
                  ...getCategoryStyle(item.category),
                }}
              >
                {getCategoryLabel(item.category)}
              </div>

              <h3>{item.title}</h3>

              <p
                style={{
                  marginTop: 10,
                  lineHeight: 1.8,
                  whiteSpace: "pre-wrap",
                  color: "#334155",
                }}
              >
                {item.content}
              </p>

              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "center",
                  color: "#94a3b8",
                  fontSize: 13,
                }}
              >
                <span>{new Date(item.created_at).toLocaleString()}</span>

                <button
                  onClick={() => deleteNews(item.id)}
                  style={{
                    ...button,
                    background: "#ef4444",
                    padding: "8px 14px",
                  }}
                >
                  {t.delete}
                </button>
              </div>
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
  color: "#334155",
};

const select = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid #e2e8f0",
  marginBottom: 12,
  background: "white",
  fontWeight: 700,
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
  minHeight: 140,
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