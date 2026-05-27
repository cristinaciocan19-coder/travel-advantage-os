import { Plus, Send, UserPlus, Instagram, ListChecks, Bell, Users, MessageCircle, Share2, Image as ImageIcon, FileText } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { NavLink } from "react-router";
import { dailyPlan } from "../lib/travelOs";
import { useProfile } from "../lib/hooks/useProfile";
import AiCreator from "../components/AiCreator";

export default function Dashboard() {
  const { profile, updateProfile } = useProfile();
  const tasks = profile?.daily_tasks || {};

  const plan = [
    { title: dailyPlan[0], description: "Începe conversații calde cu oameni din comunitatea ta", icon: Users, path: "/leaduri" },
    { title: dailyPlan[1], description: "Copiează mesajul intro potrivit pentru persoana aleasă", icon: MessageCircle, path: "/mesaje" },
    { title: dailyPlan[2], description: "Răspunde la mesajele primite și continuă conversațiile", icon: Send, path: "/mesaje" },
    { title: dailyPlan[3], description: "Împărtășește o poveste scurtă din zona de travel", icon: FileText, path: "/postari-sociale" },
    { title: dailyPlan[4], description: "Copiează promptul și creează vizualul în Krea", icon: ImageIcon, path: "/postari-sociale" },
    { title: dailyPlan[5], description: "Trimite prezentarea în mod calm și autentic", icon: Share2, path: "/mesaje" },
  ];

  const toggleTask = async (title: string) => {
    await updateProfile({ daily_tasks: { ...tasks, [title]: !tasks[title] } });
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl border border-white/70 p-10 overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-semibold text-gray-800">Travel Advantage OS</h1>
            <p className="text-xl text-[#4a9fca] italic">"Freedom starts with one warm conversation."</p>
            <p className="text-gray-600 leading-relaxed max-w-md">
              Bine ai venit în spațiul tău calm unde construiești libertatea pas cu pas.
              Fiecare conversație te apropie de visul tău de a călători și lucra de oriunde.
            </p>
          </div>
          <div className="flex-shrink-0 w-full lg:w-80 h-56 rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjB0cm9waWNhbCUyMGJlYWNoJTIwcmVzb3J0JTIwb2NlYW4lMjB0dXJxdW9pc2UlMjB3YXRlcnxlbnwxfHx8fDE3Nzk3OTgwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Tropical resort paradise"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ActionCard icon={Plus} title="Lead Nou" description="Adaugă o persoană nouă în lista ta de contacte" color="from-[#4a9fca] to-[#86c5da]" path="/leaduri" />
        <ActionCard icon={Send} title="Generează Mesaj" description="Creează un mesaj personalizat și cald" color="from-[#f7c5d8] to-[#ffd4e5]" path="/mesaje" />
        <ActionCard icon={UserPlus} title="Follow-up" description="Continuă conversația cu persoanele tale" color="from-[#a7d5ed] to-[#c5e5f5]" path="/mesaje" />
        <ActionCard icon={Instagram} title="Postare Social" description="Împărtășește momentul tău de travel" color="from-[#ffeef5] to-[#ffd4e5]" path="/postari-sociale" />
        <ActionCard icon={ListChecks} title="Daily Workflow" description="Pașii tăi de astăzi spre libertate" color="from-[#86c5da] to-[#a7d5ed]" path="/workflow" />
        <ActionCard icon={Bell} title="Telegram Reminder" description="Primește notificări pentru follow-up" color="from-[#f7c5d8] to-[#ffeef5]" path="/telegram-reminder" />
      </div>

      <AiCreator />

      <div className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl border border-white/70 p-10">
        <h2 className="text-2xl font-semibold text-gray-800">Cum folosești sistemul în 10 minute pe zi</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
          {[
            "Deschide Planul de azi",
            "Alege sau adaugă un lead",
            "Trimite mesajul",
            "Fă follow-up",
            "Creează o postare",
            "Creează o imagine",
            "Trimite prezentarea",
          ].map((step, index) => (
            <div key={step} className="bg-white/50 rounded-2xl border border-white/70 p-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4a9fca] to-[#86c5da] text-white font-semibold flex items-center justify-center flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-sm font-medium text-gray-700">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Plan Section */}
      <div className="space-y-5">
        <h2 className="text-2xl font-semibold text-gray-800">Planul de azi</h2>
        <div className="space-y-4">
          {plan.map((task, index) => (
            <WorkflowCard
              key={task.title}
              number={index + 1}
              title={task.title}
              description={task.description}
              icon={task.icon}
              completed={Boolean(tasks[task.title])}
              onToggle={() => toggleTask(task.title)}
              path={task.path}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon: Icon, title, description, color, path }: { icon: any; title: string; description: string; color: string; path: string }) {
  return (
    <NavLink to={path} className="group relative bg-white/50 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/70 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-left">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>
      <div className="relative space-y-3">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </NavLink>
  );
}

function WorkflowCard({ number, title, description, icon: Icon, completed, onToggle, path }: { number: number; title: string; description: string; icon: any; completed: boolean; onToggle: () => void; path: string }) {
  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/70 flex flex-col md:flex-row md:items-center gap-6 hover:shadow-xl transition-all">
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className="w-6 h-6 rounded-lg border-2 border-[#4a9fca] text-[#4a9fca] focus:ring-[#4a9fca] focus:ring-offset-0 cursor-pointer"
      />
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#4a9fca] to-[#86c5da] text-white font-semibold shadow-lg">
        {number}
      </div>
      <div className="flex-1">
        <h4 className={`text-lg font-semibold ${completed ? "line-through text-gray-500" : "text-gray-800"}`}>{title}</h4>
        <p className={`text-sm ${completed ? "text-gray-400" : "text-gray-600"}`}>{description}</p>
      </div>
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#f7c5d8] to-[#ffd4e5] flex items-center justify-center">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <NavLink to={path} className="px-6 py-2.5 bg-gradient-to-r from-[#4a9fca] to-[#86c5da] text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all">
        Începe
      </NavLink>
    </div>
  );
}
