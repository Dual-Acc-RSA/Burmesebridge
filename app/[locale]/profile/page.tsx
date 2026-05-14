"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const params = useParams();
  const locale = String(params.locale || "my");

  const text = {
    my: {
      title: "ပရိုဖိုင် ပြင်ရန်",
      email: "အီးမေးလ်",
      name: "အမည်",
      placeholder: "သင့်အမည်",
      save: "သိမ်းမည်",
      saved: "သိမ်းပြီးပါပြီ",
      loading: "ခေတ္တစောင့်ပါ...",
    },
    zh: {
      title: "编辑个人资料",
      email: "邮箱",
      name: "显示名称",
      placeholder: "请输入你的名字",
      save: "保存",
      saved: "保存成功",
      loading: "加载中...",
    },
    en: {
      title: "Edit Profile",
      email: "Email",
      name: "Display Name",
      placeholder: "Your name",
      save: "Save",
      saved: "Saved successfully",
      loading: "Loading...",
    },
  };

  const t = text[locale as keyof typeof text] || text.en;

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = `/${locale}/login`;
      return;
    }

    const user = userData.user;

    const { data } = await supabase
      .from("profiles")
      .select("email, display_name")
      .eq("id", user.id)
      .maybeSingle();

    setEmail(data?.email || user.email || "");
    setDisplayName(data?.display_name || "");
    setLoading(false);
  }

  async function saveProfile() {
    setMessage("");

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = `/${locale}/login`;
      return;
    }

    const user = userData.user;

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      display_name: displayName,
      role: "user",
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(t.saved);
    await loadProfile();
  }

  if (loading) {
    return <main style={{ padding: 40 }}>{t.loading}</main>;
  }

  return (
    <main style={{ padding: "48px 24px", minHeight: "100vh" }}>
      <section style={{ maxWidth: "640px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "24px" }}>{t.title}</h1>

        <div style={card}>
          <label style={label}>
            {t.email}
            <input value={email} disabled style={input} />
          </label>

          <label style={label}>
            {t.name}
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={input}
              placeholder={t.placeholder}
            />
          </label>

          <button onClick={saveProfile} style={button}>
            {t.save}
          </button>

          {message && (
            <p style={{ marginTop: 16, color: "#10b981" }}>{message}</p>
          )}
        </div>
      </section>
    </main>
  );
}

const card = {
  background: "white",
  color: "#0f172a",
  padding: "28px",
  borderRadius: "20px",
  border: "1px solid #e2e8f0",
};

const label = {
  display: "grid",
  gap: "8px",
  marginBottom: "18px",
  fontWeight: 700,
};

const input = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  fontSize: "16px",
};

const button = {
  background: "#2563eb",
  color: "white",
  padding: "14px 18px",
  borderRadius: "12px",
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
};