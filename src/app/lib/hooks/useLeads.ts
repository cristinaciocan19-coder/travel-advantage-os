import { useEffect, useState } from "react";
import { supabase, Lead, LeadStatus } from "../supabase";
import { useAuth } from "../AuthProvider";

export function useLeads() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, [user]);

  const addLead = async (lead: Pick<Lead, "name" | "contact" | "note">) => {
    if (!user) return null;
    const { data, error } = await supabase
      .from("leads")
      .insert({ ...lead, user_id: user.id, status: "nou" as LeadStatus })
      .select()
      .single();
    if (!error && data) setLeads([data, ...leads]);
    return data;
  };

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    const { data, error } = await supabase
      .from("leads")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (!error && data) {
      setLeads(leads.map((l) => (l.id === id ? data : l)));
    }
    return data;
  };

  const deleteLead = async (id: string) => {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (!error) setLeads(leads.filter((l) => l.id !== id));
  };

  return { leads, loading, addLead, updateLead, deleteLead, refetch: fetchLeads };
}
