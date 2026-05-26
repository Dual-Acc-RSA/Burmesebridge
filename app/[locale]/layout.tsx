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
      home: "ပင်မ",
      learn: "လေ့လာရန်",
      forum: "Community",
      jobs: "အလုပ်",
      news: "သတင်း",
      checkin: "ချက်အင်",
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

        {/* 桌面顶部菜单去掉，避免和首页入口重复。
            保留空容器，防止原 CSS flex 布局突然错位。 */}
        <div className="site-menu" aria-hidden="true" />

        <div className="site-actions">
          <AuthMenu locale={locale} />
          <LanguageMenu locale={locale} />
        </div>
      </nav>

      <main className="site-main">{children}</main>

      {/* 手机底部导航保留：这是移动端主要入口，不能删。 */}
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