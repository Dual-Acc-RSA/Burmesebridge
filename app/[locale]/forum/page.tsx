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
      like: "Like",
      comment: "Comment",
      share: "Share",
    },
    zh: {
      title: "社区论坛",
      placeholder: "分享点什么...",
      post: "发布",
      login: "请先登录",
      anonymous: "BurmeseBridge 用户",
      delete: "删除",
      confirmDelete: "确定要删除这条帖子吗？",
      like: "点赞",
      comment: "评论",
      share: "分享",
    },
    en: {
      title: "Forum",
      placeholder: "Share something...",
      post: "Post",
      login: "Please login",
      anonymous: "BurmeseBridge User",
      delete: "Delete",
      confirmDelete: "Delete this post?",
      like: "Like",
      comment: "Comment",
      share: "Share",
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
    <main
      style={{
        padding: "48px 24px",
        maxWidth: "920px",
        margin: "0 auto",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "42px", marginBottom: "24px" }}>{t.title}</h1>

      <div style={composerCard}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t.placeholder}
          style={textarea}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "14px",
          }}
        >
          <button onClick={createPost} style={postButton}>
            {t.post}
          </button>
        </div>
      </div>

      <div style={{ marginTop: "24px", display: "grid", gap: "18px" }}>
        {posts.map((post) => {
          const profile = getProfile(post);
          const author = profile?.display_name || profile?.email || t.anonymous;
          const badge = profile?.badge || "member";

          return (
            <article key={post.id} style={postCard}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                }}
              >
                <div style={avatar}>{author.slice(0, 1).toUpperCase()}</div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <strong style={{ color: "#0f172a", fontSize: "16px" }}>
                      {author}
                    </strong>

                    {profile?.verified && <Badge type="verified" />}

                    <Badge type={badge as any} />
                  </div>

                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: "13px",
                      marginTop: "4px",
                    }}
                  >
                    {new Date(post.created_at).toLocaleString()}
                  </div>

                  <div
                    style={{
                      marginTop: "16px",
                      color: "#0f172a",
                      fontSize: "16px",
                      lineHeight: 1.9,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {post.content}
                  </div>

                  <div style={actionBar}>
                    <button style={socialButton}>👍 {t.like}</button>
                    <button style={socialButton}>💬 {t.comment}</button>
                    <button style={socialButton}>↗ {t.share}</button>

                    {currentUserId === post.user_id && (
                      <button
                        onClick={() => deletePost(post.id)}
                        style={{
                          ...socialButton,
                          color: "#ef4444",
                        }}
                      >
                        🗑 {t.delete}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

const composerCard = {
  background: "white",
  padding: "20px",
  borderRadius: "22px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 8px 30px rgba(15,23,42,0.05)",
};

const postCard = {
  background: "white",
  borderRadius: "22px",
  padding: "20px",
  boxShadow: "0 8px 30px rgba(15,23,42,0.06)",
  border: "1px solid rgba(226,232,240,0.9)",
};

const textarea = {
  width: "100%",
  minHeight: "120px",
  padding: "16px",
  borderRadius: "16px",
  border: "1px solid #cbd5e1",
  resize: "none" as const,
  fontSize: "16px",
  outline: "none",
};

const postButton = {
  padding: "12px 22px",
  borderRadius: "999px",
  border: "none",
  background: "#2563eb",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

const avatar = {
  minWidth: "52px",
  width: "52px",
  height: "52px",
  borderRadius: "999px",
  background: "linear-gradient(135deg,#2563eb,#7c3aed)",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: 800,
  fontSize: "18px",
};

const actionBar = {
  marginTop: "18px",
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "14px",
  borderTop: "1px solid #e2e8f0",
  paddingTop: "14px",
};

const socialButton = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontWeight: 700,
  color: "#64748b",
  padding: "6px",
};