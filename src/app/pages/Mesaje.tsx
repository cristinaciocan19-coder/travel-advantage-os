import { Check, Copy, FileText, MessageCircle, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { defaultLeads, followUpMessage, introMessage, Lead, presentationMessage } from "../lib/travelOs";
import { useLocalStorage } from "../lib/useLocalStorage";

export default function Mesaje() {
  const [leads] = useLocalStorage<Lead[]>("taos-leads", defaultLeads);
  const [selectedName, setSelectedName] = useState(leads[0]?.name ?? "");
  const [copied, setCopied] = useState("");

  const messages = useMemo(
    () => [
      {
        id: "intro",
        icon: MessageCircle,
        title: "Mesaj intro",
        question: "Ce trimit prima dată?",
        text: introMessage(selectedName),
      },
      {
        id: "follow-up",
        icon: Send,
        title: "Follow-up",
        question: "Cum revin calm?",
        text: followUpMessage(selectedName),
      },
      {
        id: "presentation",
        icon: FileText,
        title: "Prezentare",
        question: "Ce prezentare trimit?",
        text: presentationMessage(selectedName),
      },
    ],
    [selectedName],
  );

  const copyText = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    window.setTimeout(() => setCopied(""), 1800);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl border border-white/70 p-10">
        <h1 className="text-3xl font-semibold text-gray-800">Ce mesaj trimit?</h1>
        <p className="text-gray-600 mt-2">Alege persoana și copiază mesajul potrivit.</p>
      </div>

      <div className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-6 flex flex-col md:flex-row md:items-center gap-4">
        <label className="text-sm font-medium text-gray-700">Pentru</label>
        <select
          value={selectedName}
          onChange={(event) => setSelectedName(event.target.value)}
          className="flex-1 rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
        >
          {leads.map((lead) => (
            <option key={lead.id} value={lead.name}>
              {lead.name}
            </option>
          ))}
        </select>
        <input
          value={selectedName}
          onChange={(event) => setSelectedName(event.target.value)}
          placeholder="sau scrie un nume"
          className="flex-1 rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {messages.map((message) => (
          <div key={message.id} className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-6 space-y-5">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4a9fca] to-[#86c5da] flex items-center justify-center shadow-lg">
              <message.icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#4a9fca]">{message.question}</p>
              <h2 className="text-xl font-semibold text-gray-800">{message.title}</h2>
            </div>
            <p className="min-h-56 rounded-2xl bg-white/60 border border-white/80 p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {message.text}
            </p>
            <button
              onClick={() => copyText(message.id, message.text)}
              className="w-full px-5 py-3 bg-gradient-to-r from-[#4a9fca] to-[#86c5da] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              {copied === message.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied === message.id ? "Copiat" : "Copiază"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
