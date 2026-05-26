import { Bell, CheckCircle2, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { defaultLeads, Lead, Reminder } from "../lib/travelOs";
import { useLocalStorage } from "../lib/useLocalStorage";

export default function TelegramReminder() {
  const [leads] = useLocalStorage<Lead[]>("taos-leads", defaultLeads);
  const [reminders, setReminders] = useLocalStorage<Reminder[]>("taos-reminders", []);
  const [leadName, setLeadName] = useState(leads[0]?.name ?? "");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("Follow-up blând");

  const addReminder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!leadName.trim() || !date) return;

    setReminders([
      { id: crypto.randomUUID(), leadName: leadName.trim(), date, note: note.trim(), done: false },
      ...reminders,
    ]);
    setDate("");
    setNote("Follow-up blând");
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map((reminder) => (reminder.id === id ? { ...reminder, done: !reminder.done } : reminder)));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl border border-white/70 p-10">
        <h1 className="text-3xl font-semibold text-gray-800">Când revin?</h1>
        <p className="text-gray-600 mt-2">Reminder-ele sunt salvate local și rămân simple: persoană, zi, motiv.</p>
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
        <form onSubmit={addReminder} className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-6 space-y-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f7c5d8] to-[#ffd4e5] flex items-center justify-center shadow-lg">
            <Plus className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Reminder nou</h2>
            <p className="text-sm text-gray-600">Alege persoana și ziua în care revii.</p>
          </div>
          <select
            value={leadName}
            onChange={(event) => setLeadName(event.target.value)}
            className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
          >
            {leads.map((lead) => (
              <option key={lead.id} value={lead.name}>
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
          {reminders.map((reminder) => (
            <button
              key={reminder.id}
              onClick={() => toggleReminder(reminder.id)}
              className="w-full bg-white/50 backdrop-blur-xl rounded-2xl shadow-lg border border-white/70 p-5 flex items-center gap-4 text-left hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4a9fca] to-[#86c5da] flex items-center justify-center flex-shrink-0">
                {reminder.done ? <CheckCircle2 className="w-6 h-6 text-white" /> : <Bell className="w-6 h-6 text-white" />}
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${reminder.done ? "line-through text-gray-500" : "text-gray-800"}`}>
                  {reminder.leadName}
                </h3>
                <p className="text-sm text-[#4a9fca]">{reminder.date}</p>
                <p className="text-sm text-gray-600 mt-1">{reminder.note}</p>
              </div>
            </button>
          ))}
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
