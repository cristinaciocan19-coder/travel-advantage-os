import { Bell, CheckCircle2, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLeads } from "../lib/hooks/useLeads";
import { useReminders } from "../lib/hooks/useReminders";

export default function TelegramReminder() {
  const { leads } = useLeads();
  const { reminders, addReminder, toggleReminder } = useReminders();
  const [leadId, setLeadId] = useState(leads[0]?.id ?? "");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("Follow-up blând");

  const handleAddReminder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!leadId || !date) return;
    await addReminder({ lead_id: leadId, date, note: note.trim() });
    setDate("");
    setNote("Follow-up blând");
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl border border-white/70 p-10">
        <h1 className="text-3xl font-semibold text-gray-800">Când revin?</h1>
        <p className="text-gray-600 mt-2">Reminder-ele sunt sincronizate și rămân simple: persoană, zi, motiv.</p>
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
        <form onSubmit={handleAddReminder} className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-6 space-y-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f7c5d8] to-[#ffd4e5] flex items-center justify-center shadow-lg">
            <Plus className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Reminder nou</h2>
            <p className="text-sm text-gray-600">Alege persoana și ziua în care revii.</p>
          </div>
          <select
            value={leadId}
            onChange={(event) => setLeadId(event.target.value)}
            className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
          >
            {leads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
          />
          <input
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
            placeholder="Motiv"
          />
          <button className="w-full px-6 py-3 bg-gradient-to-r from-[#4a9fca] to-[#86c5da] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
            Salvează reminder
          </button>
        </form>

        <div className="space-y-4">
          {reminders.map((reminder) => {
            const lead = leads.find((l) => l.id === reminder.lead_id);
            const displayName = lead?.name || "[Lead șters]";
            return (
              <button
                key={reminder.id}
                onClick={() => toggleReminder(reminder.id, !reminder.done)}
                className="w-full bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-5 flex items-center gap-4 text-left hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4a9fca] to-[#86c5da] flex items-center justify-center flex-shrink-0">
                  {reminder.done ? <CheckCircle2 className="w-6 h-6 text-white" /> : <Bell className="w-6 h-6 text-white" />}
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${reminder.done ? "line-through text-gray-500" : "text-gray-800"}`}>
                    {displayName}
                  </h3>
                  <p className="text-sm text-[#4a9fca]">{reminder.date}</p>
                  <p className="text-sm text-gray-600 mt-1">{reminder.note}</p>
                </div>
              </button>
            );
          })}
          {reminders.length === 0 && (
            <div className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-6 text-gray-600">
              Nu ai reminder-e încă.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
