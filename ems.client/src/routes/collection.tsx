import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "pages/layout";
import Login from "pages/auth/login.container";
import Signup from "pages/auth/signup.container";
import adminPrivateRoutes from "./admin";
import ChangePassword from "pages/auth/changPassword.container";
import ProtectedRoute from "./protected";
import Profile from "pages/profile";
import Home from "pages/home";
import ExplorePackages from "pages/explorePackages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" />, // redirect to home if hit '/'
  },  
  {
    id: "root",
    path: "/",
    Component: Layout,
    children: [
      ...adminPrivateRoutes(),
      {
        path: "/User/profile",
        element: <ProtectedRoute outlet={<Profile/>}/>
      },
    ]
  },
  {
    id: "explore-packages",
    path: "/explore-packages",
    Component: ExplorePackages
  },
  {
    id: "home",
    path: "/home",
    Component: Home
  },
  {
    id: "login",
    path: "/login",
    Component: Login
  },
  {
    id: "signup",
    path: "/signup",
    Component: Signup
  },
  {
    id: "change-password",
    path: "/change-password",
    Component: ChangePassword
  }
])