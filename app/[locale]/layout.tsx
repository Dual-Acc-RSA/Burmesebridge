import Link from "next/link";

export default async function LocaleLayout({
  children,
  params,
}:{
  children:React.ReactNode;
  params:Promise<{locale:string}>
}){

  const {locale}=await params;

  return(
    <>
      <nav
        style={{
          display:"flex",
          gap:"20px",
          padding:"20px",
          background:"white"
        }}
      >
        <Link href={`/${locale}`}>首页</Link>
        <Link href={`/${locale}/learn`}>学习</Link>
        <Link href={`/${locale}/forum`}>社区</Link>
      </nav>

      {children}
    </>
  )
}
