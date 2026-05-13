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
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "40px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
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
                width: "90px",
                height: "90px",
                borderRadius: "9999px",
                background: "#2563eb",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: 700,
              }}
            >
              B
            </div>

            <div>
              <h1
                style={{
                  fontSize: "38px",
                  marginBottom: "8px",
                }}
              >
                BurmeseBridge 用户
              </h1>

              <p style={{ color: "#64748b" }}>
                缅甸中文学习平台 · 测试版本
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "40px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "18px",
            }}
          >
            <div style={card}>
              <h3>学习进度</h3>
              <p>12%</p>
            </div>

            <div style={card}>
              <h3>签到积分</h3>
              <p>20 分</p>
            </div>

            <div style={card}>
              <h3>当前等级</h3>
              <p>Lv.1</p>
            </div>

            <div style={card}>
              <h3>已学习课程</h3>
              <p>3 个</p>
            </div>
          </div>

          <div style={{ marginTop: "40px" }}>
            <h2 style={{ marginBottom: "18px" }}>快捷入口</h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <a href="/my/learn" style={button}>
                学习中心
              </a>

              <a href="/my/checkin" style={button}>
                每日签到
              </a>

              <a href="/my/forum" style={button}>
                社区论坛
              </a>

              <a href="/my/jobs" style={button}>
                工作招聘
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const card = {
  background: "#f8fafc",
  padding: "24px",
  borderRadius: "18px",
  border: "1px solid #e2e8f0",
};

const button = {
  padding: "14px 18px",
  borderRadius: "12px",
  background: "#2563eb",
  color: "white",
  textDecoration: "none",
  fontWeight: 700,
};