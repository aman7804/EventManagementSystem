import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./protected";
import Photography from "pages/photography";

const Venue = lazy(
  () => import("pages/venue")
);

export default function adminPrivateRoutes() {
  return [
    {path: "/admin/venue", element: <ProtectedRoute outlet={<Venue />} />},
    {path: "/admin/photography", element: <ProtectedRoute outlet={<Photography />} />},
    {path: "/admin/*", element: <Navigate to="/" replace />}
  ]
}
