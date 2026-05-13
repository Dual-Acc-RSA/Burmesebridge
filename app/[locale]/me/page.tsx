"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MePage() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? null);
    }

    getUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/my/login";
  }

  return (
    <main
      style={{
        padding: "48px 24px 96px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "36px",
            borderRadius: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "88px",
                height: "88px",
                borderRadius: "999px",
                background: "#2563eb",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                fontWeight: 700,
              }}
            >
              B
            </div>

            <div>
              <h1 style={{ fontSize: "38px", marginBottom: "8px" }}>
                BurmeseBridge User
              </h1>

              <p style={{ color: "#64748b" }}>
                {email ? email : "Not logged in"}
              </p>

              <p style={{ color: "#10b981", fontWeight: 700 }}>
                Verified Member
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "36px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "18px",
            }}
          >
            <div style={card}>
              <h3>积分</h3>
              <p>0</p>
            </div>

            <div style={card}>
              <h3>连续签到</h3>
              <p>0 天</p>
            </div>

            <div style={card}>
              <h3>学习进度</h3>
              <p>0%</p>
            </div>

            <div style={card}>
              <h3>我的帖子</h3>
              <p>0</p>
            </div>
          </div>

          <div style={{ marginTop: "36px" }}>
            <h2>快捷入口</h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                marginTop: "16px",
              }}
            >
              <a href="/my/learn" style={button}>学习中心</a>
              <a href="/my/checkin" style={button}>每日 Check In</a>
              <a href="/my/forum" style={button}>社区论坛</a>
              <a href="/my/jobs" style={button}>工作信息</a>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              marginTop: "36px",
              padding: "14px 20px",
              borderRadius: "12px",
              border: "none",
              background: "#ef4444",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </section>
    </main>
  );
}

const card = {
  background: "#f8fafc",
  padding: "22px",
  borderRadius: "18px",
  border: "1px solid #e2e8f0",
};

const button = {
  padding: "12px 16px",
  borderRadius: "12px",
  background: "#2563eb",
  color: "white",
  fontWeight: 700,
  textDecoration: "none",
};