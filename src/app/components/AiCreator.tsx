import { Check, Copy, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { ClaudePromptType, generateWithClaude } from "../lib/claude";

const modes: { id: ClaudePromptType; label: string; placeholder: string }[] = [
  {
    id: "socialPost",
    label: "Postare",
    placeholder: "Ex: vreau o postare despre un city break și libertate",
  },
  {
    id: "dmMessage",
    label: "Mesaj",
    placeholder: "Ex: mesaj pentru Ana, îi plac vacanțele și lucrează remote",
  },
  {
    id: "followUp",
    label: "Follow-up",
    placeholder: "Ex: a văzut prezentarea, dar nu a răspuns încă",
  },
  {
    id: "presentationCoach",
    label: "Prezentare",
    placeholder: "Ex: vreau să explic simplu pentru cineva nou",
  },
  {
    id: "dailySocialPlan",
    label: "Plan social azi",
    placeholder: "Ex: am 10 minute și vreau un plan ușor",
  },
];

export default function AiCreator() {
  const [selectedMode, setSelectedMode] = useState<ClaudePromptType>("socialPost");
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");
  const [isFallback, setIsFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeMode = useMemo(() => modes.find((mode) => mode.id === selectedMode) || modes[0], [selectedMode]);

  const createText = async () => {
    setIsLoading(true);
    const response = await generateWithClaude(selectedMode, userInput);
    setResult(response.text);
    setIsFallback(response.fallback);
    setIsLoading(false);
  };

  const copyResult = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl border border-white/70 p-10 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-5">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4a9fca] to-[#86c5da] flex items-center justify-center shadow-lg">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Ce vrei să creezi?</h2>
          <p className="text-gray-600 mt-1">Alege un tip de text și scrie câteva cuvinte.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-3">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={`px-4 py-3 rounded-xl font-medium transition-all ${
              selectedMode === mode.id
                ? "bg-gradient-to-r from-[#4a9fca] to-[#86c5da] text-white shadow-lg"
                : "bg-white/60 border border-white/80 text-gray-700 hover:bg-white/80"
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <textarea
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
        placeholder={activeMode.placeholder}
        rows={4}
        className="w-full rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
      />

      <button
        onClick={createText}
        disabled={isLoading}
        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#4a9fca] to-[#86c5da] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
      >
        {isLoading ? "Creez..." : "Creează text"}
      </button>

      {result && (
        <div className="space-y-4">
          {isFallback && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-900">AI offline — variantă pregătită manual</p>
                <p className="text-xs text-amber-700 mt-1">
                  Cheia API nu e configurată sau e indisponibilă. Textul de mai jos e o variantă pregătită.
                  Pentru AI live, verifică <code>ANTHROPIC_API_KEY</code> în Vercel.
                </p>
              </div>
            </div>
          )}
          <p className="rounded-2xl bg-white/60 border border-white/80 p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {result}
          </p>
          <button
            onClick={copyResult}
            className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-[#f7c5d8] to-[#ffd4e5] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? "Copiat" : "Copiază"}
          </button>
        </div>
      )}
    </div>
  );
}
