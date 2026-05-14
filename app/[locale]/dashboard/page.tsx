"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Profile = {
  email: string | null;
  display_name: string | null;
  points: number | null;
};

export default function DashboardPage() {
  const params = useParams();
  const locale = String(params.locale || "my");

  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      setErrorText("");

      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        setErrorText(userError.message);
        setLoading(false);
        return;
      }

      if (!userData.user) {
        window.location.href = `/${locale}/login`;
        return;
      }

      const user = userData.user;

      setEmail(user.email || "");

      const { data: profile, error: selectError } = await supabase
        .from("profiles")
        .select("email, display_name, points")
        .eq("id", user.id)
        .maybeSingle();

      if (selectError) {
        setErrorText(selectError.message);
        setLoading(false);
        return;
      }

      if (!profile) {
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: user.id,
            email: user.email,
            display_name: "",
            role: "user",
            points: 0,
          })
          .select("email, display_name, points")
          .single();

        if (insertError) {
          setErrorText(insertError.message);
          setLoading(false);
          return;
        }

        showProfile(newProfile);
        setLoading(false);
        return;
      }

      showProfile(profile);
      setLoading(false);
    }

    function showProfile(profile: Profile) {
      setEmail(profile.email || "");
      setDisplayName(profile.display_name || "");
      setPoints(profile.points || 0);
    }

    loadProfile();
  }, [locale]);

  if (loading) {
    return (
      <main style={{ padding: 40 }}>
        Loading...
      </main>
    );
  }

  if (errorText) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Dashboard Error</h1>
        <p style={{ color: "red", marginTop: 16 }}>{errorText}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "48px 24px", minHeight: "100vh" }}>
      <section style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "24px" }}>
          Dashboard
        </h1>

        <div style={card}>
          <h2>Profile</h2>
          <p>Email: {email}</p>
          <p>Name: {displayName || "No name yet"}</p>
          <p>Points: {points}</p>
        </div>

        <div style={{ marginTop: "24px", display: "grid", gap: "16px" }}>
          <a href={`/${locale}/me`} style={button}>My Account</a>
          <a href={`/${locale}/checkin`} style={button}>Check In</a>
          <a href={`/${locale}/learn`} style={button}>Learning</a>
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

const button = {
  display: "block",
  background: "#2563eb",
  color: "white",
  padding: "14px 18px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: 700,
};