import { Home, Users, MessageCircle, Share2, Workflow, Bell, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router";
import { useAuth } from "../lib/AuthProvider";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Users, label: "Lead-uri", path: "/leaduri" },
  { icon: MessageCircle, label: "Mesaje", path: "/mesaje" },
  { icon: Share2, label: "Postări Sociale", path: "/postari-sociale" },
  { icon: Workflow, label: "Workflow", path: "/workflow" },
  { icon: Bell, label: "Telegram Reminder", path: "/telegram-reminder" },
  { icon: Settings, label: "Setări", path: "/setari" },
];

export default function Sidebar() {
  const { user, signOut } = useAuth();

  return (
    <aside className="w-72 p-6 flex flex-col gap-8">
      <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-lg border border-white/60 p-6 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-[#4a9fca] to-[#f7c5d8] bg-clip-text text-transparent">
            Travel Advantage
          </h1>
        </div>

        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-white/40">
          <p className="text-xs text-gray-500 truncate mb-2">{user?.email}</p>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition"
          >
            <LogOut className="w-4 h-4" />
            Deconectare
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon: Icon, label, path }: { icon: any; label: string; path: string }) {
  return (
    <NavLink
      to={path}
      end={path === "/"}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          isActive
            ? "bg-gradient-to-r from-[#4a9fca] to-[#86c5da] text-white shadow-lg"
            : "text-gray-700 hover:bg-white/40"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </NavLink>
  );
}
