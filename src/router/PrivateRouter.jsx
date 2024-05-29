import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRouter = () => {
  const { currentUser } = useAuthContext();
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRouter;
