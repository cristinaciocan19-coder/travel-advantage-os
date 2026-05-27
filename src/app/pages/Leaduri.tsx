import { Plus, UserRound, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { defaultLeads, Lead } from "../lib/travelOs";
import { useLocalStorage } from "../lib/useLocalStorage";

export default function Leaduri() {
  const [leads, setLeads] = useLocalStorage<Lead[]>("taos-leads", defaultLeads);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");

  const addLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return;

    setLeads([
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        contact: contact.trim() || "Instagram",
        note: note.trim(),
        status: "nou",
      },
      ...leads,
    ]);
    setName("");
    setContact("");
    setNote("");
  };

  const updateStatus = (id: string, status: Lead["status"]) => {
    setLeads(leads.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
  };

  const deleteLead = (id: string) => {
    if (confirm("Ștergi definitiv acest lead?")) {
      setLeads(leads.filter((lead) => lead.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl border border-white/70 p-10">
        <h1 className="text-3xl font-semibold text-gray-800">Cui trimit mesaj?</h1>
        <p className="text-gray-600 mt-2">Păstrează oamenii calzi într-o listă simplă, salvată în browser.</p>
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
        <form onSubmit={addLead} className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-6 space-y-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4a9fca] to-[#86c5da] flex items-center justify-center shadow-lg">
            <Plus className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Lead nou</h2>
            <p className="text-sm text-gray-600">Adaugă persoana, canalul și o notiță scurtă.</p>
          </div>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nume"
            className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
          />
          <input
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            placeholder="Instagram, WhatsApp, Facebook..."
            className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
          />
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Ce știu despre ea?"
            rows={4}
            className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
          />
          <button className="w-full px-6 py-3 bg-gradient-to-r from-[#4a9fca] to-[#86c5da] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
            Salvează lead
          </button>
        </form>

        <div className="space-y-4">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-5 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f7c5d8] to-[#ffd4e5] flex items-center justify-center flex-shrink-0">
                <UserRound className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{lead.name}</h3>
                    <p className="text-sm text-[#4a9fca]">{lead.contact}</p>
                  </div>
                  <select
                    value={lead.status}
                    onChange={(event) => updateStatus(lead.id, event.target.value as Lead["status"])}
                    className="rounded-xl border border-white/80 bg-white/70 px-3 py-2 text-sm text-gray-700 outline-none"
                  >
                    <option value="nou">Nou</option>
                    <option value="intro">Intro trimis</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="prezentare">Prezentare</option>
                  </select>
                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                    aria-label="Șterge lead"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                {lead.note && <p className="text-sm text-gray-600 mt-3 leading-relaxed">{lead.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
