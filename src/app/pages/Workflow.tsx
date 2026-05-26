import { CalendarCheck, CheckCircle2 } from "lucide-react";
import { dailyPlan } from "../lib/travelOs";
import { useLocalStorage } from "../lib/useLocalStorage";

export default function Workflow() {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>("taos-daily-plan", {});

  const toggle = (task: string) => {
    setChecked({ ...checked, [task]: !checked[task] });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl border border-white/70 p-10">
        <h1 className="text-3xl font-semibold text-gray-800">Ce fac azi?</h1>
        <p className="text-gray-600 mt-2">Un plan scurt, bifabil, salvat local pentru ritmul Cristinei.</p>
      </div>

      <div className="space-y-4">
        {dailyPlan.map((task, index) => (
          <button
            key={task}
            onClick={() => toggle(task)}
            className="w-full bg-white/50 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/70 flex items-center gap-5 text-left hover:shadow-xl transition-all"
          >
            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4a9fca] to-[#86c5da] text-white font-semibold shadow-lg flex items-center justify-center">
              {checked[task] ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
            </span>
            <span className="flex-1">
              <span className={`block text-lg font-semibold ${checked[task] ? "line-through text-gray-500" : "text-gray-800"}`}>
                {task}
              </span>
              <span className="block text-sm text-gray-600 mt-1">
                {index === 0 && "Începe cu oamenii care deja te cunosc."}
                {index === 1 && "Trimite conversația simplu, fără presiune."}
                {index === 2 && "Revino blând la persoanele care au răspuns."}
                {index === 3 && "Pune o idee travel pe social."}
                {index === 4 && "Pregătește vizualul care susține postarea."}
                {index === 5 && "Trimite linkul potrivit când există interes."}
              </span>
            </span>
            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f7c5d8] to-[#ffd4e5] flex items-center justify-center">
              <CalendarCheck className="w-6 h-6 text-white" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
