import { createBrowserRouter } from "react-router-dom";
import Layout from "pages/layout";
import Dashboard from "pages/dashboard";
import Login from "pages/auth/login.container";
import Registration from "pages/auth/registration.container";
import adminPrivateRoutes from "./admin";
import ChangePassword from "pages/auth/changPassword.container";

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
      ...adminPrivateRoutes()      
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