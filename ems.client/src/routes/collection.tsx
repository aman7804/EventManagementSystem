import { createBrowserRouter } from "react-router-dom";
import Layout from "pages/layout";
import Dashboard from "pages/dashboard";
import Login from "pages/auth/login.container";
import Registration from "pages/auth/registration.container";
import adminPrivateRoutes from "./admin";
import ChangePassword from "pages/auth/changPassword.container";
import { lazy } from "react";
import ProtectedRoute from "./protected";

const Profile = lazy(
  () => import("pages/profile")
)

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        path: "/dashboard",
        Component: Dashboard
      },
      ...adminPrivateRoutes(),
      {
        index: true,
        path: "/User/profile",
        element: <ProtectedRoute outlet={<Profile/>}/>
      }
    ]
  },
  {
    id: "login",
    path: "/login",
    Component: Login
  },
  {
    id: "signup",
    path: "/signup",
    Component: Registration
  },
  {
    id: "change-password",
    path: "/change-password",
    Component: ChangePassword
  }
])