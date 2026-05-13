export default function HomePage() {
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
          display: "grid",
          gap: "32px",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #2563eb, #10b981)",
            color: "white",
            padding: "48px",
            borderRadius: "28px",
          }}
        >
          <h1 style={{ fontSize: "48px", margin: 0 }}>
            BurmeseBridge
          </h1>

          <p style={{ fontSize: "22px", marginTop: "18px", lineHeight: 1.7 }}>
            缅甸人中文学习平台
          </p>

          <p style={{ opacity: 0.9 }}>
            学中文 · 找资源 · 问问题 · 交流经验
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={card}>
            <h2>学习区</h2>
            <p>中文口语、打工中文、生活中文、视频学习。</p>
          </div>

          <div style={card}>
            <h2>社区论坛</h2>
            <p>提问、交流、分享经验、互相帮助。</p>
          </div>

          <div style={card}>
            <h2>工作信息</h2>
            <p>翻译、工厂、服务业等相关信息。</p>
          </div>

          <div style={card}>
            <h2>最新新闻</h2>
            <p>泰国、缅甸、劳工、证件相关资讯。</p>
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