import { NextResponse } from "next/server";

/**
 * Admin News Translation API
 *
 * 当前版本：
 * - 只提供安全接口骨架
 * - 不连接外部 AI
 * - 不影响现有手动三语发布
 *
 * 后续版本：
 * - 接 OpenRouter / Gemini / Qwen
 * - 自动生成 my / zh / en 三语内容
 * - 缅语必须经过本地化润色
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

    return NextResponse.json({
      success: true,
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
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Translate API error",
      },
      { status: 500 }
    );
  }
}
