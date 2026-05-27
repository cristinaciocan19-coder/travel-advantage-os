import { useEffect, useState } from "react";
import { supabase, Reminder } from "../supabase";
import { useAuth } from "../AuthProvider";

export function useReminders() {
  const { user } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReminders = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("reminders")
      .select("*")
      .order("date", { ascending: true });
    if (!error && data) setReminders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReminders();
  }, [user]);

  const addReminder = async (reminder: Pick<Reminder, "lead_id" | "date" | "note">) => {
    if (!user) return null;
    const { data, error } = await supabase
      .from("reminders")
      .insert({ ...reminder, user_id: user.id, done: false })
      .select()
      .single();
    if (!error && data)
      setReminders([...reminders, data].sort((a, b) => a.date.localeCompare(b.date)));
    return data;
  };

  const toggleReminder = async (id: string, done: boolean) => {
    const { data, error } = await supabase
      .from("reminders")
      .update({ done })
      .eq("id", id)
      .select()
      .single();
    if (!error && data) {
      setReminders(reminders.map((r) => (r.id === id ? data : r)));
    }
  };

  const deleteReminder = async (id: string) => {
    const { error } = await supabase.from("reminders").delete().eq("id", id);
    if (!error) setReminders(reminders.filter((r) => r.id !== id));
  };

  return { reminders, loading, addReminder, toggleReminder, deleteReminder, refetch: fetchReminders };
}
