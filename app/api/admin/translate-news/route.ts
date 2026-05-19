import { NextResponse } from "next/server";

/**
 * Admin News Translation API
 *
 * 使用 Azure Translator 生成 my / zh / en 三语草稿。
 *
 * 保护规则：
 * - Azure 正常：返回翻译
 * - Azure 失败：返回原文
 * - Key 缺失：返回原文
 * - 网络失败：返回原文
 * - 不影响登录 / 签到 / 语言切换 / Admin / Forum
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title = String(body.title || "").trim();
    const content = String(body.content || "").trim();
    const sourceLanguage = String(body.sourceLanguage || "auto");

    if (!title || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing title or content",
        },
        { status: 400 }
      );
    }

    const key = process.env.AZURE_TRANSLATOR_KEY;
    const region = process.env.AZURE_TRANSLATOR_REGION;

    if (!key || !region) {
      return fallbackResponse(
        sourceLanguage,
        title,
        content,
        "Azure config missing"
      );
    }

    async function translate(text: string, to: string) {
      try {
        const endpoint =
          `https://api.cognitive.microsofttranslator.com/translate` +
          `?api-version=3.0&to=${to}`;

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key": key!,
            "Ocp-Apim-Subscription-Region": region!,
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify([{ text }]),
        });

        if (!response.ok) {
          console.log("Azure translate error:", await response.text());
          return text;
        }

        const data = await response.json();

        return data?.[0]?.translations?.[0]?.text || text;
      } catch (error) {
        console.log("Azure translate failed:", error);
        return text;
      }
    }

    const [titleMy, titleEn, contentMy, contentEn] = await Promise.all([
      translate(title, "my"),
      translate(title, "en"),
      translate(content, "my"),
      translate(content, "en"),
    ]);

    return NextResponse.json({
      success: true,
      provider: "azure",
      data: {
        sourceLanguage,

        title_my: titleMy,
        title_zh: title,
        title_en: titleEn,

        content_my: contentMy,
        content_zh: content,
        content_en: contentEn,
      },
    });
  } catch (error) {
    console.log("Translate route error:", error);

    return NextResponse.json({
      success: true,
      fallback: true,
      reason: "Translate route failed",
      data: {
        sourceLanguage: "auto",
        title_my: "",
        title_zh: "",
        title_en: "",
        content_my: "",
        content_zh: "",
        content_en: "",
      },
    });
  }
}

/**
 * Azure 不可用时返回原文，保证后台页面不坏。
 */
function fallbackResponse(
  sourceLanguage: string,
  title: string,
  content: string,
  reason: string
) {
  return NextResponse.json({
    success: true,
    fallback: true,
    reason,
    data: {
      sourceLanguage,

      title_my: title,
      title_zh: title,
      title_en: title,

      content_my: content,
      content_zh: content,
      content_en: content,
    },
  });
}