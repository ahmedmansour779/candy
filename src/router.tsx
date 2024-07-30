import { createBrowserRouter } from "react-router-dom";

import Error from "./components/shared/Error";

import LandingPage from "./pages/LandingPage";

// Auth
import Login from "./pages/client/Login";

// client
import Home from "./pages/client/Home";
import Pricing from "./pages/client/Pricing";
import Chat from "./pages/client/Chat";
import ClientSettingsPage from "./pages/client/Setting";
//// admin
import Admin from "./pages/admin/";

//users
import UsersPage from "./pages/admin/users/UsersPage";
import UserAddPage from "./pages/admin/users/UserAddPage";
import UserEditPage from "./pages/admin/users/UserEditPage";

//roles
import RolesPage from "./pages/admin/roles/RolesPage";
import RoleAddPage from "./pages/admin/roles/RoleAddPage";
import RoleEditPage from "./pages/admin/roles/RoleEditPage";

import SubscriptionsPage from "./pages/admin/subscriptions/SubscriptionsPage";
import SubscriptionsPlansPage from "./pages/admin/plans/SubscriptionsPlansPage";
import AdminSettingsPage from "./pages/admin/settings";
import ChatPageLayout from "./components/layout/ChatPageLayout";
import LayoutPage from "./components/shared/Layout";
import SubsciptionsPlanAdd from "./pages/admin/plans/SubsciptionsPlanAdd";
import SubsciptionsPlanEdit from "./pages/admin/plans/SubsciptionsPlanEdit";
import ProtectRoute from "./pages/client/ProtectRoute";
import Register from "./pages/client/Register";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    // element: <Login />,

    children: [
      {
        element: <ProtectRoute/>,
        children : [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            element: <LayoutPage />,
            children: [
              {
                path: "/drive",
                children: [
                  {
                    index: true,
                    element: <Home />,
                    errorElement: <Error />,
                  },
                  {
                    path: "pricing",
                    element: <Pricing />,
                    errorElement: <Error />,
                  },
                  {
                    path: "settings",
                    element: <ClientSettingsPage />,
                  },
                  {
                    path: "chat",
                    element: <ChatPageLayout />,
                    children: [
                      { index: true, errorElement: <Error /> },
                      { path: ":id", element: <Chat />, errorElement: <Error /> },
                    ],
                  },
                ],
              },
              {
                path: "admin",
                children: [
                  {
                    index: true,
                    element: <Admin />,
                    errorElement: <Error />,
                  },
                  {
                    path: "users",
                    errorElement: <Error />,
                    children: [
                      {
                        index: true,
                        errorElement: <Error />,
                        element: <UsersPage />,
                      },
                      {
                        path: "new",
                        element: <UserAddPage />,
                        errorElement: <Error />,
                      },
                      {
                        path: ":id/edit",
                        element: <UserEditPage />,
                        errorElement: <Error />,
                      },
                    ],
                  },
                  {
                    path: "roles",
                    errorElement: <Error />,
                    children: [
                      {
                        index: true,
                        errorElement: <Error />,
                        element: <RolesPage />,
                      },
                      {
                        path: "new",
                        element: <RoleAddPage />,
                        errorElement: <Error />,
                      },
                      {
                        path: ":id/edit",
                        element: <RoleEditPage />,
                        errorElement: <Error />,
                      },
                    ],
                  },
                  {
                    path: "subscriptions",
                    element: <SubscriptionsPage />,
                    errorElement: <Error />,
                  },
                  {
                    path: "subscriptions-plans",
    
                    errorElement: <Error />,
                    children: [
                      {
                        index: true,
                        errorElement: <Error />,
                        element: <SubscriptionsPlansPage />,
                      },
                      {
                        path: "new",
                        element: <SubsciptionsPlanAdd />,
                        errorElement: <Error />,
                      },
                      {
                        path: ":id/edit",
                        element: <SubsciptionsPlanEdit />,
                        errorElement: <Error />,
                      },
                    ],
                  },
                  {
                    path: "settings",
                    element: <AdminSettingsPage />,
                    errorElement: <Error />,
                  },
                ],
              },
            ]
          }
        ],
      },

      {
        path: "login",
        element: <Login />,
        errorElement: <Error />,
      },
      {
        path: "register",
        element: <Register />,
        errorElement: <Error />,
      },
    ],
  },
]);
export default router;
