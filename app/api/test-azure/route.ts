import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.AZURE_TRANSLATOR_KEY!;
  const region = process.env.AZURE_TRANSLATOR_REGION!;

  const endpoint =
    "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en&to=my";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Ocp-Apim-Subscription-Region": region,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify([
      {
        text: "工作地点曼谷，需要中缅翻译"
      }
    ])
  });

  const data = await response.json();

  return new Response(
    JSON.stringify(data, null, 2),
    {
      headers: {
        "Content-Type":
          "application/json; charset=utf-8"
      }
    }
  );
}