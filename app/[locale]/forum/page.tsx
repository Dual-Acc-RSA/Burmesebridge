"use client";

import Badge from "@/components/Badges";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Profile = {
  display_name?: string | null;
  email?: string | null;
  verified?: boolean | null;
  badge?: string | null;
};

type Post = {
  id: number;
  content: string;
  created_at: string;
  user_id: string;
  profiles?: Profile | Profile[] | null;
};

export default function ForumPage() {
  const params = useParams();
  const locale = String(params.locale || "my");

  const text = {
    my: {
      title: "Community",
      placeholder: "တစ်ခုခု မျှဝေပါ...",
      post: "ပို့စ်တင်မည်",
      login: "ကျေးဇူးပြု၍အကောင့်ဝင်ပါ",
      anonymous: "BurmeseBridge အသုံးပြုသူ",
      delete: "ဖျက်မည်",
      confirmDelete: "ဒီပို့စ်ကို ဖျက်မှာ သေချာပါသလား?",
    },
    zh: {
      title: "社区论坛",
      placeholder: "分享点什么...",
      post: "发布",
      login: "请先登录",
      anonymous: "BurmeseBridge 用户",
      delete: "删除",
      confirmDelete: "确定要删除这条帖子吗？",
    },
    en: {
      title: "Forum",
      placeholder: "Share something...",
      post: "Post",
      login: "Please login",
      anonymous: "BurmeseBridge User",
      delete: "Delete",
      confirmDelete: "Delete this post?",
    },
  };

  const t = text[locale as keyof typeof text] || text.en;

  const [currentUserId, setCurrentUserId] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    loadUser();
    loadPosts();
  }, []);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setCurrentUserId(user?.id || "");
  }

  async function loadPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        id,
        content,
        created_at,
        user_id,
        profiles (
          display_name,
          email,
          verified,
          badge
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setPosts((data || []) as Post[]);
  }

  async function createPost() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert(t.login);
      return;
    }

    if (!content.trim()) return;

    const { error } = await supabase.from("posts").insert({
      user_id: user.id,
      content: content.trim(),
    });

    if (error) {
      alert(error.message);
      return;
    }

    setContent("");
    await loadPosts();
  }

  async function deletePost(postId: number) {
    const ok = confirm(t.confirmDelete);
    if (!ok) return;

    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      alert(error.message);
      return;
    }

    await loadPosts();
  }

  function getProfile(post: Post): Profile | null {
    if (Array.isArray(post.profiles)) {
      return post.profiles[0] || null;
    }

    return post.profiles || null;
  }

  return (
    <main style={{ padding: "48px 24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "42px", marginBottom: "24px" }}>{t.title}</h1>

      <div style={card}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t.placeholder}
          style={textarea}
        />

        <button onClick={createPost} style={button}>
          {t.post}
        </button>
      </div>

      <div style={{ marginTop: "24px", display: "grid", gap: "18px" }}>
        {posts.map((post) => {
          const profile = getProfile(post);

          const author =
            profile?.display_name || profile?.email || t.anonymous;

          const badge = profile?.badge || "member";

          return (
            <div key={post.id} style={card}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "999px",
                    background: "#2563eb",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  {author.slice(0, 1).toUpperCase()}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flexWrap: "wrap",
                      fontWeight: 700,
                    }}
                  >
                    {author}

                    {profile?.verified && <Badge type="verified" />}

                    <Badge type={badge as any} />
                  </div>

                  <div
                    style={{
                      color: "#64748b",
                      fontSize: "13px",
                      marginTop: "4px",
                    }}
                  >
                    {new Date(post.created_at).toLocaleString()}
                  </div>
                </div>
              </div>

              <p style={{ lineHeight: 1.8 }}>{post.content}</p>

              {currentUserId === post.user_id && (
                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    onClick={() => deletePost(post.id)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    {t.delete}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}

const card = {
  background: "white",
  padding: "24px",
  borderRadius: "20px",
  border: "1px solid #e2e8f0",
};

const textarea = {
  width: "100%",
  minHeight: "120px",
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid #cbd5e1",
  resize: "none" as const,
};

const button = {
  marginTop: "16px",
  padding: "12px 18px",
  borderRadius: "12px",
  border: "none",
  background: "#2563eb",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};