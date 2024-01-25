import { createBrowserRouter } from "react-router-dom";
import Layout from "pages/layout";
import Dashboard from "pages/dashboard";

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
    ]
  },
//   {
//     id: "login",
//     path: "/login",
//     Component: 
//   }
])