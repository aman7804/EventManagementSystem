import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./protected";

const Venue = lazy(
  () => import("pages/venue")
);
const Photography = lazy(
  () => import("pages/photography")
);
const Decoration = lazy(
  () => import("pages/decoration")
);
const Catering = lazy(
  () => import("pages/catering")
);
const User = lazy(
  () => import("pages/user")
);
const Package = lazy(
  () => import("pages/package")
);
const Booking = lazy(
  () => import("pages/booking")
);

export default function adminPrivateRoutes() {
  return [
    {path: "/admin/venue", element: <ProtectedRoute outlet={<Venue />} />},
    {path: "/admin/photography", element: <ProtectedRoute outlet={<Photography />} />},
    {path: "/admin/decoration", element: <ProtectedRoute outlet={<Decoration />} />},
    {path: "/admin/catering", element: <ProtectedRoute outlet={<Catering />} />},
    {path: "/admin/users", element: <ProtectedRoute outlet={<User />} />},
    {path: "/admin/packages", element: <ProtectedRoute outlet={<Package />} />},
    {path: "/admin/booking", element: <ProtectedRoute outlet={<Booking />} />},
    {path: "/admin/*", element: <Navigate to="/" replace />}
  ]
}
