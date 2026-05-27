import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Download, Settings, Link as LinkIcon, User, LogOut, Database } from "lucide-react";
import { useAuth } from "../lib/AuthProvider";
import { useProfile } from "../lib/hooks/useProfile";
import { useLeads } from "../lib/hooks/useLeads";
import { useReminders } from "../lib/hooks/useReminders";

export default function Setari() {
  const { signOut } = useAuth();
  const { profile, updateProfile } = useProfile();
  const { leads, addLead } = useLeads();
  const { reminders } = useReminders();
  const [aiStatus, setAiStatus] = useState<"checking" | "ok" | "fallback" | "error">("checking");
  const [migrationStatus, setMigrationStatus] = useState<"idle" | "running" | "done" | "error">("idle");

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

  const hasLocalData = () => {
    return localStorage.getItem("taos-leads") || localStorage.getItem("taos-reminders");
  };

  const migrateFromLocalStorage = async () => {
    setMigrationStatus("running");
    try {
      const oldLeads = JSON.parse(localStorage.getItem("taos-leads") || "[]");
      for (const lead of oldLeads) {
        await addLead({ name: lead.name, contact: lead.contact || "Instagram", note: lead.note || "" });
      }
      localStorage.removeItem("taos-leads");
      localStorage.removeItem("taos-reminders");
      localStorage.removeItem("taos-daily-plan");
      localStorage.removeItem("taos-default-name");
      localStorage.removeItem("taos-presentation-link");
      setMigrationStatus("done");
    } catch {
      setMigrationStatus("error");
    }
  };

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
          value={profile?.default_name || ""}
          onChange={(e) => updateProfile({ default_name: e.target.value })}
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
          value={profile?.presentation_link || ""}
          onChange={(e) => updateProfile({ presentation_link: e.target.value })}
          placeholder="https://..."
          className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
        />
      </div>

      {/* Migration from localStorage */}
      {hasLocalData() && migrationStatus === "idle" && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-semibold text-amber-900">Date vechi detectate</h2>
          </div>
          <p className="text-sm text-amber-700">
            Avem date salvate local din versiunea veche. Le mutăm acum în noua bază de date.
            Reminder-ele nu se migrează (ID-urile de lead s-au schimbat).
          </p>
          <button
            onClick={migrateFromLocalStorage}
            className="px-4 py-2 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition"
          >
            Migrează acum
          </button>
        </div>
      )}
      {migrationStatus === "running" && (
        <p className="text-sm text-gray-500 px-2">Migrare în curs...</p>
      )}
      {migrationStatus === "done" && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <p className="text-sm text-green-700">✓ Date migrate cu succes din localStorage în Supabase.</p>
        </div>
      )}
      {migrationStatus === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-sm text-red-700">Eroare la migrare. Încearcă din nou sau adaugă leadurile manual.</p>
        </div>
      )}

      {/* Export backup */}
      <div className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-6 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">Backup date</h2>
        <p className="text-sm text-gray-600">
          {leads.length} leads · {reminders.length} reminders salvate în Supabase.
        </p>
        <button
          onClick={exportData}
          className="px-5 py-3 bg-gradient-to-r from-[#4a9fca] to-[#86c5da] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Descarcă backup JSON
        </button>
      </div>

      {/* Logout */}
      <div className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-6 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">Cont</h2>
        <button
          onClick={signOut}
          className="px-5 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium shadow hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Deconectare
        </button>
      </div>
    </div>
  );
}
