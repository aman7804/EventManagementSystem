import { checkIsAdmin, checkIsAuthenticated } from "store/auth/selector";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export type ProtectedAdminRouteProps = {
  outlet: JSX.Element;
};

export default function ProtectedAdminRoute({outlet}: ProtectedAdminRouteProps) {
  const isAuthenticated = useSelector(checkIsAuthenticated);
  const isAdmin = useSelector(checkIsAdmin);

  return (isAuthenticated && isAdmin)
    ? outlet
    : <Navigate to={{ pathname: "/login" }} />
    
};