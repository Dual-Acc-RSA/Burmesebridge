import LanguageMenu from "@/components/LanguageMenu";
import AuthMenu from "@/components/AuthMenu";
import Link from "next/link";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const nav = {
    my: {
      home: "ပင်မစာမျက်နှာ",
      learn: "သင်ယူရန်",
      forum: "Community",
      jobs: "အလုပ်",
      news: "သတင်း",
      checkin: "ချက်အင်လုပ်ရန်",
    },
    zh: {
      home: "首页",
      learn: "学习",
      forum: "社区",
      jobs: "工作",
      news: "新闻",
      checkin: "签到",
    },
    en: {
      home: "Home",
      learn: "Learn",
      forum: "Community",
      jobs: "Jobs",
      news: "News",
      checkin: "Check In",
    },
  };

  const t = nav[locale as keyof typeof nav] || nav.en;

  return (
    <div className="site-shell">
      <nav className="site-nav">
        <Link href={`/${locale}`} className="site-logo">
          BurmeseBridge
        </Link>

        <div className="site-menu">
          <Link href={`/${locale}`}>{t.home}</Link>
          <Link href={`/${locale}/learn`}>{t.learn}</Link>
          <Link href={`/${locale}/forum`}>{t.forum}</Link>
          <Link href={`/${locale}/jobs`}>{t.jobs}</Link>
          <Link href={`/${locale}/news`}>{t.news}</Link>
          <Link href={`/${locale}/checkin`}>{t.checkin}</Link>
        </div>

        <div className="site-actions">
          <AuthMenu locale={locale} />
          <LanguageMenu locale={locale} />
        </div>
      </nav>

      <main className="site-main">{children}</main>

      <div className="mobile-tabbar">
        <Link href={`/${locale}`}>{t.home}</Link>
        <Link href={`/${locale}/learn`}>{t.learn}</Link>
        <Link href={`/${locale}/forum`}>{t.forum}</Link>
        <Link href={`/${locale}/checkin`}>{t.checkin}</Link>
      </div>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div>
            <h3>BurmeseBridge</h3>
            <p>Burmese Chinese Learning Platform</p>
          </div>

          <div>© 2026 BurmeseBridge</div>
        </div>
      </footer>
    </div>
  );
}