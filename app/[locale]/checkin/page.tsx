export default function CheckinPage() {
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
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "42px", marginBottom: "12px" }}>
          每日签到
        </h1>

        <p style={{ color: "#64748b", fontSize: "18px", marginBottom: "32px" }}>
          每天签到获得积分，后面可用于等级、认证和学习成长系统。
        </p>

        <div style={card}>
          <h2>今日签到</h2>
          <p>当前版本是页面展示版，后面会接 Supabase 登录和数据库。</p>

          <button
            style={{
              marginTop: "20px",
              padding: "14px 22px",
              borderRadius: "12px",
              border: "none",
              background: "#2563eb",
              color: "white",
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            签到 +1 积分
          </button>
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "16px",
          }}
        >
          <div style={smallCard}>
            <h3>连续签到</h3>
            <p>0 天</p>
          </div>

          <div style={smallCard}>
            <h3>当前积分</h3>
            <p>0 分</p>
          </div>

          <div style={smallCard}>
            <h3>等级</h3>
            <p>Newbie</p>
          </div>
        </div>
      </section>
    </main>
  );
}

const card = {
  background: "white",
  padding: "32px",
  borderRadius: "20px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
};

const smallCard = {
  background: "white",
  padding: "22px",
  borderRadius: "18px",
  border: "1px solid #e2e8f0",
};