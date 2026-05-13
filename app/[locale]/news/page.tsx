export default function NewsPage() {
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
          新闻资讯
        </h1>

        <p style={{ color: "#64748b", fontSize: "18px", marginBottom: "32px" }}>
          泰国、缅甸、劳工、证件、生活相关资讯。
        </p>

        <div style={{ display: "grid", gap: "18px" }}>
          <article style={newsCard}>
            <h2>泰国劳工政策更新</h2>
            <p>这里以后发布与缅甸劳工、工作证、签证相关的重要信息。</p>
            <small>政策资讯 · 置顶</small>
          </article>

          <article style={newsCard}>
            <h2>缅甸人在泰生活提醒</h2>
            <p>交通、医院、租房、证件办理等生活信息分享。</p>
            <small>生活资讯</small>
          </article>

          <article style={newsCard}>
            <h2>中文学习新闻</h2>
            <p>适合缅甸学习者关注的中文学习资源与活动。</p>
            <small>学习资讯</small>
          </article>
        </div>
      </section>
    </main>
  );
}

const newsCard = {
  background: "white",
  padding: "26px",
  borderRadius: "18px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
};