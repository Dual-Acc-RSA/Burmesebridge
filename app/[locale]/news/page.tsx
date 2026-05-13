export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const content = {
    my: {
      title: "သတင်း",
      subtitle: "ထိုင်း၊ မြန်မာ၊ အလုပ်သမား၊ ဗီဇာနှင့် စာရွက်စာတမ်းဆိုင်ရာ သတင်းများ",
      news: [
        {
          title: "ထိုင်းအလုပ်သမား မူဝါဒသတင်း",
          text: "မြန်မာအလုပ်သမားများအတွက် အလုပ်လုပ်ခွင့်၊ ဗီဇာနှင့် စာရွက်စာတမ်းဆိုင်ရာ အရေးကြီးသတင်းများ။",
          meta: "အလုပ်သမားသတင်း · အရေးကြီး",
        },
        {
          title: "ထိုင်းနိုင်ငံတွင် နေထိုင်မှုသတိပြုရန်",
          text: "သွားလာရေး၊ ဆေးရုံ၊ အိမ်ငှားခြင်းနှင့် နေ့စဉ်ဘဝအတွက် အသုံးဝင်သော သတင်းများ။",
          meta: "ဘဝသတင်း",
        },
        {
          title: "တရုတ်စာလေ့လာရေး သတင်း",
          text: "မြန်မာလူမျိုးများအတွက် တရုတ်စာလေ့လာရေး အရင်းအမြစ်များနှင့် လှုပ်ရှားမှုများ။",
          meta: "သင်ယူရေးသတင်း",
        },
      ],
    },

    zh: {
      title: "新闻资讯",
      subtitle: "泰国、缅甸、劳工、签证、证件和生活相关资讯",
      news: [
        {
          title: "泰国劳工政策更新",
          text: "这里以后发布与缅甸劳工、工作证、签证相关的重要信息。",
          meta: "劳工资讯 · 重要",
        },
        {
          title: "缅甸人在泰生活提醒",
          text: "交通、医院、租房、证件办理等生活信息分享。",
          meta: "生活资讯",
        },
        {
          title: "中文学习资源更新",
          text: "适合缅甸学习者关注的中文学习资源与活动。",
          meta: "学习资讯",
        },
      ],
    },

    en: {
      title: "News",
      subtitle: "Thailand, Myanmar, labor, visa, document and daily life information",
      news: [
        {
          title: "Thailand Labor Policy Updates",
          text: "Important updates about work permits, visas and documents for Burmese workers.",
          meta: "Labor News · Important",
        },
        {
          title: "Life in Thailand Reminders",
          text: "Useful information about transport, hospitals, rent and daily life.",
          meta: "Life News",
        },
        {
          title: "Chinese Learning Resources",
          text: "Learning resources and activities for Burmese Chinese learners.",
          meta: "Learning News",
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
        <h1 style={{ fontSize: "48px", marginBottom: "14px" }}>
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

        <div style={{ display: "grid", gap: "20px" }}>
          {t.news.map((item, index) => (
            <article
              key={index}
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "22px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
              }}
            >
              <h2 style={{ fontSize: "30px", marginBottom: "14px" }}>
                {item.title}
              </h2>

              <p
                style={{
                  color: "#475569",
                  lineHeight: 1.9,
                  fontSize: "18px",
                }}
              >
                {item.text}
              </p>

              <small style={{ color: "#64748b" }}>{item.meta}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}