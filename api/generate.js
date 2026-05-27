const fallbackText =
  "Momentan folosesc varianta pregătită din sistem. Poți copia textul de mai jos și îl poți adapta rapid pentru persoana aleasă.";

const modeInstructions = {
  socialPost:
    "Scrie o postare social media caldă, simplă și autentică despre travel lifestyle și Travel Advantage. Fără promisiuni rapide.",
  dmMessage:
    "Scrie un mesaj DM scurt, prietenos și fără presiune despre Travel Advantage.",
  followUp:
    "Scrie un follow-up blând pentru o persoană care a primit deja un mesaj despre Travel Advantage.",
  presentationCoach:
    "Ajut-o pe Cristina să explice Travel Advantage clar, calm și uman pentru un prospect.",
  dailySocialPlan:
    "Creează un plan social simplu pentru azi, cu pași scurți pentru postare, mesaj și follow-up.",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Origin check
  const ALLOWED_ORIGINS = [
    "https://travel-advantage-os.vercel.app",
    "http://localhost:5173",
  ];
  const origin = req.headers.origin || req.headers.referer || "";
  const isAllowed = ALLOWED_ORIGINS.some(o => origin.startsWith(o));
  if (!isAllowed) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // Rate limit in-memory: max 10 cereri/minut per IP
  if (!globalThis.__rateLimit) globalThis.__rateLimit = new Map();
  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  const now = Date.now();
  const recent = (globalThis.__rateLimit.get(ip) || []).filter(t => now - t < 60000);
  if (recent.length >= 10) {
    return res.status(429).json({ error: "Rate limit exceeded" });
  }
  recent.push(now);
  globalThis.__rateLimit.set(ip, recent);

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      text: fallbackText,
      fallback: true,
    });
  }

  try {
    const { promptType, userInput } = req.body || {};
    const instruction = modeInstructions[promptType] || modeInstructions.socialPost;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 700,
        messages: [
          {
            role: "user",
            content: `${instruction}

Context Cristina:
- limba română
- ton cald, feminin, simplu
- fără presiune
- fără promisiuni exagerate
- focus pe travel, comunitate, flexibilitate

Input:
${userInput || "Creează o variantă scurtă pentru azi."}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return res.status(200).json({
        text: fallbackText,
        fallback: true,
      });
    }

    const data = await response.json();
    const text = data?.content?.[0]?.text;

    return res.status(200).json({
      text: text || fallbackText,
      fallback: !text,
    });
  } catch {
    return res.status(200).json({
      text: fallbackText,
      fallback: true,
    });
  }
}
