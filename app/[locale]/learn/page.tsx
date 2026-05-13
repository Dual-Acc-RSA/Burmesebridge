export default function LearnPage() {
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
          学习区
        </h1>

        <p style={{ color: "#64748b", fontSize: "18px", marginBottom: "32px" }}>
          面向缅甸零基础学习者的中文口语内容。
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={card}>
            <h2>中文口语</h2>
            <p>从打招呼、介绍自己、问路开始。</p>
          </div>

          <div style={card}>
            <h2>打工中文</h2>
            <p>工厂、工地、老板沟通常用句。</p>
          </div>

          <div style={card}>
            <h2>生活中文</h2>
            <p>吃饭、购物、交通、医院常用表达。</p>
          </div>

          <div style={card}>
            <h2>视频学习</h2>
            <p>后面嵌入 YouTube / Facebook / TikTok 视频。</p>
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