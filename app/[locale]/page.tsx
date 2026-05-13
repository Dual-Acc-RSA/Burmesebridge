export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const content = {
    my: {
      title: "BurmeseBridge",
      subtitle: "မြန်မာလူမျိုးများအတွက် တရုတ်ဘာသာ သင်ယူရေးနှင့် ဖလှယ်ရေး ပလက်ဖောင်း",
      desc: "တရုတ်စာလေ့လာရန် · မေးခွန်းမေးရန် · အတွေ့အကြုံမျှဝေရန်",
      learn: "သင်ယူရန်",
      forum: "အသိုင်းအဝိုင်း",
      jobs: "အလုပ်အကိုင်",
      news: "သတင်း",
    },
    zh: {
      title: "BurmeseBridge",
      subtitle: "缅甸人中文学习平台",
      desc: "学中文 · 找资源 · 问问题 · 交流经验",
      learn: "学习区",
      forum: "社区论坛",
      jobs: "工作信息",
      news: "新闻资讯",
    },
    en: {
      title: "BurmeseBridge",
      subtitle: "Chinese Learning Platform for Burmese Users",
      desc: "Learn Chinese · Find resources · Ask questions · Share experience",
      learn: "Learn",
      forum: "Community",
      jobs: "Jobs",
      news: "News",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

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
          <h1 style={{ fontSize: "48px", margin: 0 }}>{t.title}</h1>

          <p style={{ fontSize: "22px", marginTop: "18px", lineHeight: 1.7 }}>
            {t.subtitle}
          </p>

          <p style={{ opacity: 0.9 }}>{t.desc}</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={card}>
            <h2>{t.learn}</h2>
            <p>中文口语、打工中文、生活中文、视频学习。</p>
          </div>

          <div style={card}>
            <h2>{t.forum}</h2>
            <p>提问、交流、分享经验、互相帮助。</p>
          </div>

          <div style={card}>
            <h2>{t.jobs}</h2>
            <p>翻译、工厂、服务业等相关信息。</p>
          </div>

          <div style={card}>
            <h2>{t.news}</h2>
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