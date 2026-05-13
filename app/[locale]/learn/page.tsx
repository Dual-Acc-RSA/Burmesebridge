type Props = {
  params: {
    locale: string;
  };
};

export default async function LearnPage({ params }: Props) {
  const { locale } = params;

  const content = {
    my: {
      title: "သင်ယူရန်",
      subtitle:
        "တရုတ်စကားပြော၊ အလုပ်ခွင်သုံး တရုတ်စာနှင့် နေ့စဉ်ဘဝသုံး တရုတ်စာ",
    },
    zh: {
      title: "学习区",
      subtitle: "中文口语、打工中文、生活中文",
    },
    en: {
      title: "Learn",
      subtitle: "Speaking Chinese and workplace Chinese",
    },
  };

  const current = content[locale as keyof typeof content] || content.en;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "42px" }}>{current.title}</h1>
        <p style={{ color: "#64748b", marginBottom: "32px" }}>
          {current.subtitle}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
          }}
        >
          <div style={cardStyle}>
            <h2>中文口语</h2>
            <p>从零基础开始学习最实用的中文口语。</p>
          </div>

          <div style={cardStyle}>
            <h2>打工中文</h2>
            <p>适合工厂、工地、服务业等工作场景。</p>
          </div>

          <div style={cardStyle}>
            <h2>生活中文</h2>
            <p>点餐、购物、交通等日常生活中文。</p>
          </div>
        </div>
      </div>
    </main>
  );
}

const cardStyle = {
  background: "white",
  padding: "24px",
  borderRadius: "20px",
  border: "1px solid #e2e8f0",
};
