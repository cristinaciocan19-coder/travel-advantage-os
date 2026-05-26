import { Outlet } from "react-router";
import { Home, Users, MessageCircle, Share2, Workflow, Bell, Settings } from "lucide-react";
import Sidebar from "./Sidebar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function Root() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Tropical Background */}
      <div className="fixed inset-0 -z-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1586500036706-41963de24d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cm9waWNhbCUyMGJlYWNoJTIwcmVzb3J0JTIwb2NlYW4lMjB0dXJxdW9pc2UlMjB3YXRlcnxlbnwxfHx8fDE3Nzk3OTgwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Luxury tropical beach background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-blue-50/60 to-pink-50/50 backdrop-blur-sm"></div>
      </div>

      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8 pb-16">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
