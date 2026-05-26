import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Dashboard from "./pages/Dashboard";
import Leaduri from "./pages/Leaduri";
import Mesaje from "./pages/Mesaje";
import PostariSociale from "./pages/PostariSociale";
import Workflow from "./pages/Workflow";
import TelegramReminder from "./pages/TelegramReminder";
import Setari from "./pages/Setari";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
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
