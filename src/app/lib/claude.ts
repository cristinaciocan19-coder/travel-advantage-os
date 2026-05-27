import { followUpMessage, introMessage, presentationVariants, socialPost } from "./travelOs";

export type ClaudePromptType =
  | "socialPost"
  | "dmMessage"
  | "followUp"
  | "presentationCoach"
  | "dailySocialPlan";

type ClaudeResult = {
  text: string;
  fallback: boolean;
};

const localFallbacks: Record<ClaudePromptType, (userInput: string) => string> = {
  socialPost: (userInput) => socialPost(userInput || "libertatea de a călători mai des", ""),
  dmMessage: (userInput) => introMessage(userInput || "dragă"),
  followUp: (userInput) => followUpMessage(userInput || "dragă"),
  presentationCoach: () => presentationVariants.find((variant) => variant.id === "presentation-full")?.text || "",
  dailySocialPlan: () =>
    `Plan social pentru azi:

1. Postează o idee scurtă despre travel și libertate.
2. Alege 3 persoane calde.
3. Trimite un mesaj simplu, fără presiune.
4. Fă un follow-up blând cu cine a răspuns.
5. Creează o imagine travel și folosește-o la postare.`,
};

export async function generateWithClaude(promptType: ClaudePromptType, userInput: string): Promise<ClaudeResult> {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ promptType, userInput }),
    });

    if (!response.ok) {
      throw new Error("Claude generation failed");
    }

    const data = (await response.json()) as ClaudeResult;
    return {
      text: data.text || localFallbacks[promptType](userInput),
      fallback: Boolean(data.fallback),
    };
  } catch {
    return {
      text: localFallbacks[promptType](userInput),
      fallback: true,
    };
  }
}
