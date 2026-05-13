export default function MePage() {
  return (
    <main
      style={{
        padding: "48px 24px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "42px", marginBottom: "12px" }}>
          我的
        </h1>

        <p style={{ color: "#64748b", fontSize: "18px", marginBottom: "32px" }}>
          用户资料、学习记录、积分等级和认证状态。
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={card}>
            <h2>个人资料</h2>
            <p>用户名、头像、简介、语言偏好。</p>
          </div>

          <div style={card}>
            <h2>积分等级</h2>
            <p>签到积分、发帖积分、等级成长。</p>
          </div>

          <div style={card}>
            <h2>认证状态</h2>
            <p>教师认证、创作者认证、可信用户认证。</p>
          </div>

          <div style={card}>
            <h2>我的帖子</h2>
            <p>查看我发布过的帖子和评论。</p>
          </div>
        </div>
      </section>
    </main>
  );
}

const card = {
  background: "white",
  padding: "28px",
  borderRadius: "20px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
};