export type Lead = {
  id: string;
  name: string;
  contact: string;
  note: string;
  status: "nou" | "intro" | "follow-up" | "prezentare";
};

export type Reminder = {
  id: string;
  leadName: string;
  date: string;
  note: string;
  done: boolean;
};

export const defaultLeads: Lead[] = [
  {
    id: "lead-cristina-demo-1",
    name: "Andreea",
    contact: "Instagram",
    note: "Iubește city break-urile și lucrează remote.",
    status: "nou",
  },
  {
    id: "lead-cristina-demo-2",
    name: "Mădălina",
    contact: "WhatsApp",
    note: "A întrebat de vacanțe mai accesibile pentru familie.",
    status: "follow-up",
  },
];

export const dailyPlan = [
  "Aleg 3 persoane calde",
  "Trimit un mesaj intro",
  "Fac un follow-up",
  "Postez o idee scurtă",
  "Creez o imagine travel",
  "Trimit prezentarea potrivită",
];

export const introMessage = (name: string) =>
  `Bună, ${name || "dragă"}! M-am gândit la tine pentru că îți plac călătoriile și lucrurile făcute cu sens. Am început să folosesc o platformă care ajută oamenii să călătorească mai smart și să descopere o oportunitate flexibilă în zona de travel. Ți-ar plăcea să îți trimit o prezentare scurtă?`;

export const followUpMessage = (name: string) =>
  `Bună, ${name || "dragă"}! Revin cu drag la mesajul meu despre Travel Advantage. Nu vreau să te grăbesc, doar să te întreb dacă ai apucat să te uiți și dacă vrei să îți trimit varianta scurtă cu pașii următori.`;

export const presentationMessage = (name: string) =>
  `Bună, ${name || "dragă"}! Îți las aici prezentarea scurtă Travel Advantage. Uită-te când ai 10 minute în liniște, iar apoi îmi spui ce ți-a atras atenția cel mai mult. Link prezentare: [adaugă linkul Cristinei]`;

export const socialPost = (theme: string, feeling: string) =>
  `Azi mă gândesc la ${theme || "libertatea de a călători mai des"}.

Pentru mine, travel nu înseamnă doar destinații frumoase, ci și sentimentul că pot alege mai mult pentru timpul meu. ${feeling || "Îmi place ideea de a construi ceva calm, pas cu pas, lângă oameni care visează la mai multă libertate."}

Dacă și tu simți că vrei să descoperi o variantă mai smart de a călători, scrie-mi și îți trimit detaliile.`;

export const travelImagePrompt = (destination: string, mood: string) =>
  `Luxury travel lifestyle photo in ${destination || "a turquoise tropical resort"}, ${mood || "warm morning light, calm elegant mood"}, soft natural colors, aspirational but authentic, woman entrepreneur planning her next trip, premium editorial photography, no text, high detail`;
