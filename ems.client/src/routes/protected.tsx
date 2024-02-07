import { checkIsAuthenticated } from "store/auth/selector";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export type ProtectedRouteProps = {
  outlet: JSX.Element;
};

export default function ProtectedRoute({outlet}: ProtectedRouteProps) {
  const isAuthenticated = useSelector(checkIsAuthenticated);

  return isAuthenticated
    ? outlet
    : <Navigate to={{ pathname: "/login" }} />
    
};