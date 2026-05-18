import { NextResponse } from "next/server";

type TranslationResult = {
  title_my: string;
  title_zh: string;
  title_en: string;
  content_my: string;
  content_zh: string;
  content_en: string;
};

const FREE_MODELS = [
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "google/gemma-4-27b-it:free",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title = String(body.title || "").trim();
    const content = String(body.content || "").trim();
    const sourceLanguage = String(body.sourceLanguage || "auto");

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: "Missing title or content" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return fallbackResponse(sourceLanguage, title, content, "Missing API key");
    }

    const preferredModel = process.env.OPENROUTER_MODEL;
    const models = preferredModel
      ? [preferredModel, ...FREE_MODELS.filter((m) => m !== preferredModel)]
      : FREE_MODELS;

    for (const model of models) {
      const result = await tryTranslateWithModel({
        apiKey,
        model,
        sourceLanguage,
        title,
        content,
      });

      if (result.ok) {
        return NextResponse.json({
          success: true,
          model,
          data: {
            sourceLanguage,
            ...result.data,
          },
        });
      }
    }

    return fallbackResponse(
      sourceLanguage,
      title,
      content,
      "All free models failed or were rate-limited"
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Translate API error",
      },
      { status: 500 }
    );
  }
}

async function tryTranslateWithModel({
  apiKey,
  model,
  sourceLanguage,
  title,
  content,
}: {
  apiKey: string;
  model: string;
  sourceLanguage: string;
  title: string;
  content: string;
}): Promise<{ ok: true; data: TranslationResult } | { ok: false }> {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://burmesebridge.eu.cc",
          "X-OpenRouter-Title": "BurmeseBridge",
        },
        body: JSON.stringify({
          model,
          temperature: 0.3,
          max_tokens: 1800,
          messages: [
            {
              role: "system",
              content: `
You are a professional Chinese-Burmese-English localization editor for BurmeseBridge.

Return JSON only. No markdown. No explanation.

Required JSON format:
{
  "title_my": "",
  "title_zh": "",
  "title_en": "",
  "content_my": "",
  "content_zh": "",
  "content_en": ""
}

Burmese requirements:
Use natural Myanmar Facebook / Telegram style.
Use real Myanmar internet expressions.
Use labor, education, community, visa, learning and job terms commonly used in Myanmar.
Avoid textbook Burmese.
Avoid direct Chinese translation.
Avoid Chinese-style Burmese.
Avoid awkward AI wording.
Avoid unnecessary English mixing.
Keep meaning accurate.
`,
            },
            {
              role: "user",
              content: `
Source language: ${sourceLanguage}

Title:
${title}

Content:
${content}

Translate and localize into Burmese(my), Chinese(zh), and English(en).
Return JSON only.
`,
            },
          ],
        }),
      }
    );

    if (!response.ok) return { ok: false };

    const result = await response.json();
    const raw = result?.choices?.[0]?.message?.content;

    if (!raw) return { ok: false };

    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    if (
      !parsed.title_my ||
      !parsed.title_zh ||
      !parsed.title_en ||
      !parsed.content_my ||
      !parsed.content_zh ||
      !parsed.content_en
    ) {
      return { ok: false };
    }

    return {
      ok: true,
      data: parsed,
    };
  } catch {
    return { ok: false };
  }
}

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