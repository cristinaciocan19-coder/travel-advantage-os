import { Check, Copy, Image as ImageIcon, Instagram, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { socialPost, travelImagePrompt } from "../lib/travelOs";

export default function PostariSociale() {
  const [theme, setTheme] = useState("o escapadă la mare");
  const [feeling, setFeeling] = useState("Îmi place ideea de a avea mai multă libertate fără să complic viața.");
  const [destination, setDestination] = useState("Santorini, terasă albă cu vedere la mare");
  const [mood, setMood] = useState("sunset glow, elegant and feminine");
  const [copied, setCopied] = useState("");

  const post = useMemo(() => socialPost(theme, feeling), [theme, feeling]);
  const prompt = useMemo(() => travelImagePrompt(destination, mood), [destination, mood]);

  const copyText = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    window.setTimeout(() => setCopied(""), 1800);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl border border-white/70 p-10">
        <h1 className="text-3xl font-semibold text-gray-800">Ce postez?</h1>
        <p className="text-gray-600 mt-2">Generează o postare caldă și un prompt pentru imaginea travel.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-6 space-y-5">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f7c5d8] to-[#ffd4e5] flex items-center justify-center shadow-lg">
            <Instagram className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-sm text-[#4a9fca]">Social post generator</p>
            <h2 className="text-xl font-semibold text-gray-800">Postare pentru azi</h2>
          </div>
          <input
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
            className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
            placeholder="Tema postării"
          />
          <textarea
            value={feeling}
            onChange={(event) => setFeeling(event.target.value)}
            rows={3}
            className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
            placeholder="Ce simt / ce vreau să transmit"
          />
          <p className="min-h-64 rounded-2xl bg-white/60 border border-white/80 p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {post}
          </p>
          <button
            onClick={() => copyText("post", post)}
            className="w-full px-5 py-3 bg-gradient-to-r from-[#4a9fca] to-[#86c5da] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {copied === "post" ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied === "post" ? "Copiat" : "Copiază postarea"}
          </button>
        </div>

        <div className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-6 space-y-5">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4a9fca] to-[#86c5da] flex items-center justify-center shadow-lg">
            <ImageIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-sm text-[#4a9fca]">Image travel</p>
            <h2 className="text-xl font-semibold text-gray-800">Prompt pentru Krea</h2>
          </div>
          <input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
            placeholder="Destinație sau cadru"
          />
          <input
            value={mood}
            onChange={(event) => setMood(event.target.value)}
            className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
            placeholder="Mood, lumină, stil"
          />
          <p className="min-h-64 rounded-2xl bg-white/60 border border-white/80 p-4 text-sm text-gray-700 leading-relaxed">
            {prompt}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <button
              onClick={() => copyText("prompt", prompt)}
              className="px-5 py-3 bg-gradient-to-r from-[#4a9fca] to-[#86c5da] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              {copied === "prompt" ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied === "prompt" ? "Copiat" : "Copiază prompt"}
            </button>
            <button
              onClick={() => window.open("https://www.krea.ai/", "_blank", "noopener,noreferrer")}
              className="px-5 py-3 bg-gradient-to-r from-[#f7c5d8] to-[#ffd4e5] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Deschide Krea
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
