import { useState, FormEvent } from "react";
import { Mail, Sparkles } from "lucide-react";
import { useAuth } from "../lib/AuthProvider";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    const { error } = await signIn(email.trim());
    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#ffeef5] via-white to-[#e8f4fb]">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/70 p-10 space-y-6">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4a9fca] to-[#86c5da] flex items-center justify-center shadow-lg mx-auto">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800">Travel Advantage OS</h1>
          <p className="text-gray-600 mt-2">Intră cu emailul tău. Primești un link sigur.</p>
        </div>

        {status === "sent" ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
            <Mail className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-900">Verifică emailul!</p>
            <p className="text-xs text-green-700 mt-1">Ți-am trimis un link de conectare la {email}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="emailul tău"
              required
              className="w-full rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#4a9fca]"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#4a9fca] to-[#86c5da] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
            >
              {status === "sending" ? "Trimit..." : "Trimite link de conectare"}
            </button>
            {status === "error" && (
              <p className="text-sm text-red-600 text-center">{errorMsg}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
