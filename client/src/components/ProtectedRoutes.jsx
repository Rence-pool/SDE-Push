import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../stores/AutProvider";
export default function ProtectedRoutes() {
  const { userState: user } = useContext(AuthContext);
  return user.id === undefined ? <Navigate to="/login" replace /> : <Outlet />;
}
