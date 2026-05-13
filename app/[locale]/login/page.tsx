"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Login success");
      window.location.href = "/my";
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          padding: "32px",
          borderRadius: "20px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "24px",
          }}
        >
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          style={input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={button}
          onClick={handleLogin}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <a
          href="/my/register"
          style={{
            display: "block",
            marginTop: "18px",
            textAlign: "center",
            color: "#2563eb",
            fontWeight: 700,
          }}
        >
          No account? Create one
        </a>
      </div>
    </main>
  );
}

const input = {
  width: "100%",
  padding: "14px",
  marginBottom: "16px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  fontSize: "16px",
};

const button = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#2563eb",
  color: "white",
  fontWeight: 700,
  fontSize: "16px",
  cursor: "pointer",
};