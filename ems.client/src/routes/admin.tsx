import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./protected";

const Venue = lazy(
  () => import("pages/venue")
);

export default function adminPrivateRoutes() {
  return [
    {path: "/admin/venue", element: <ProtectedRoute outlet={<Venue />} />},
    {path: "/admin/*", element: <Navigate to="/" replace />}
  ]
}
