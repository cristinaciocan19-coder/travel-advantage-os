import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Download, Settings, Link as LinkIcon, User } from "lucide-react";
import { useLocalStorage } from "../lib/useLocalStorage";
import { Lead, Reminder, defaultLeads } from "../lib/travelOs";

export default function Setari() {
  const [aiStatus, setAiStatus] = useState<"checking" | "ok" | "fallback" | "error">("checking");
  const [defaultName, setDefaultName] = useLocalStorage<string>("taos-default-name", "");
  const [presentationLink, setPresentationLink] = useLocalStorage<string>("taos-presentation-link", "");
  const [leads] = useLocalStorage<Lead[]>("taos-leads", defaultLeads);
  const [reminders] = useLocalStorage<Reminder[]>("taos-reminders", []);

  useEffect(() => {
    fetch("/api/generate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ promptType: "socialPost", userInput: "test" }),
    })
      .then((r) => r.json())
      .then((data) => setAiStatus(data.fallback ? "fallback" : "ok"))
      .catch(() => setAiStatus("error"));
  }, []);

  const exportData = () => {
    const data = { leads, reminders, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `travel-advantage-os-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl border border-white/70 p-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4a9fca] to-[#86c5da] flex items-center justify-center shadow-lg">
            <Settings className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">Setări</h1>
            <p className="text-gray-600 mt-1">Configurări personale și status sistem.</p>
          </div>
        </div>
      </div>

      {/* AI Status */}
      <div className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Status AI</h2>
        <div className="flex items-center gap-3">
          {aiStatus === "ok" && (
            <>
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <span className="text-gray-700">AI live — Claude Haiku 4.5</span>
            </>
          )}
          {aiStatus === "fallback" && (
            <>
              <XCircle className="w-6 h-6 text-amber-500" />
              <span className="text-gray-700">AI offline — folosesc variante pregătite</span>
            </>
          )}
          {(aiStatus === "checking" || aiStatus === "error") && (
            <span className="text-gray-500">Verific...</span>
          )}
        </div>
      </div>

      {/* Default name */}
      <div className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-6 space-y-3">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-[#4a9fca]" />
          <h2 className="text-xl font-semibold text-gray-800">Nume implicit pentru mesaje</h2>
        </div>
        <p className="text-sm text-gray-600">Folosit când nu e selectat un lead specific.</p>
        <input
          value={defaultName}
          onChange={(e) => setDefaultName(e.target.value)}
          placeholder="ex: dragă"
          className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
        />
      </div>

      {/* Presentation link */}
      <div className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-6 space-y-3">
        <div className="flex items-center gap-3">
          <LinkIcon className="w-5 h-5 text-[#4a9fca]" />
          <h2 className="text-xl font-semibold text-gray-800">Link prezentare</h2>
        </div>
        <p className="text-sm text-gray-600">Link-ul inserat automat în mesajul de prezentare.</p>
        <input
          value={presentationLink}
          onChange={(e) => setPresentationLink(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
        />
      </div>

      {/* Export backup */}
      <div className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-6 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">Backup date</h2>
        <p className="text-sm text-gray-600">
          {leads.length} leads · {reminders.length} reminders salvate local.
        </p>
        <button
          onClick={exportData}
          className="px-5 py-3 bg-gradient-to-r from-[#4a9fca] to-[#86c5da] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Descarcă backup JSON
        </button>
      </div>
    </div>
  );
}
