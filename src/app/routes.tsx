import { createBrowserRouter, Navigate } from "react-router";
import { useAuth } from "./lib/AuthProvider";
import Root from "./components/Root";
import Dashboard from "./pages/Dashboard";
import Leaduri from "./pages/Leaduri";
import Mesaje from "./pages/Mesaje";
import PostariSociale from "./pages/PostariSociale";
import Workflow from "./pages/Workflow";
import TelegramReminder from "./pages/TelegramReminder";
import Setari from "./pages/Setari";
import Login from "./pages/Login";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Se încarcă...
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Dashboard },
      { path: "leaduri", Component: Leaduri },
      { path: "mesaje", Component: Mesaje },
      { path: "postari-sociale", Component: PostariSociale },
      { path: "workflow", Component: Workflow },
      { path: "telegram-reminder", Component: TelegramReminder },
      { path: "setari", Component: Setari },
    ],
  },
]);
