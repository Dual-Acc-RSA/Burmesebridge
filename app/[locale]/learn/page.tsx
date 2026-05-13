export default async function LearnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const content = {
    my: {
      title: "သင်ယူရန်",
      subtitle: "မြန်မာလူမျိုးများအတွက် တရုတ်စကားပြော သင်ခန်းစာများ",
      cards: [
        {
          title: "တရုတ်စကားပြော",
          text: "နေ့စဉ်အသုံးများသော တရုတ်စကားပြောများကို အခြေခံမှစ၍ လေ့လာနိုင်သည်။",
        },
        {
          title: "အလုပ်သုံး တရုတ်စာ",
          text: "စက်ရုံ၊ ဆောက်လုပ်ရေး၊ ဆိုင်၊ ရုံး အလုပ်များတွင် အသုံးဝင်သော စကားများ။",
        },
        {
          title: "နေ့စဉ်သုံး",
          text: "စားသောက်၊ ဈေးဝယ်၊ လမ်းမေး၊ ဆေးရုံသွားရာတွင် အသုံးပြုနိုင်သော စကားများ။",
        },
        {
          title: "ဗီဒီယိုသင်ခန်းစာ",
          text: "YouTube / Facebook / TikTok ဗီဒီယိုများဖြင့် လေ့လာနိုင်သည်။",
        },
      ],
    },

    zh: {
      title: "学习区",
      subtitle: "面向缅甸人的中文口语学习内容",
      cards: [
        {
          title: "中文口语",
          text: "从零基础开始学习最实用的中文口语。",
        },
        {
          title: "打工中文",
          text: "适合工厂、工地、服务业、办公室等工作场景。",
        },
        {
          title: "生活中文",
          text: "吃饭、购物、问路、看病等日常生活中文。",
        },
        {
          title: "视频学习",
          text: "嵌入 YouTube / Facebook / TikTok 视频，免费且不占服务器空间。",
        },
      ],
    },

    en: {
      title: "Learn",
      subtitle: "Chinese speaking lessons for Burmese learners",
      cards: [
        {
          title: "Speaking Chinese",
          text: "Practical Chinese speaking lessons from beginner level.",
        },
        {
          title: "Workplace Chinese",
          text: "Useful Chinese for factory, construction, shop and office work.",
        },
        {
          title: "Daily Chinese",
          text: "Chinese for food, shopping, directions and hospital visits.",
        },
        {
          title: "Video Lessons",
          text: "Learn with embedded YouTube, Facebook and TikTok videos.",
        },
      ],
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
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "14px",
          }}
        >
          {t.title}
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "20px",
            lineHeight: 1.8,
            marginBottom: "36px",
          }}
        >
          {t.subtitle}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "24px",
          }}
        >
          {t.cards.map((card, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "32px",
                borderRadius: "22px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
              }}
            >
              <h2
                style={{
                  fontSize: "30px",
                  marginBottom: "18px",
                }}
              >
                {card.title}
              </h2>

              <p
                style={{
                  color: "#475569",
                  lineHeight: 1.9,
                  fontSize: "18px",
                }}
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}