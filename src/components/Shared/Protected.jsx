import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {
  const token = useSelector(
    (state) => state.register.token || state.login.token
  );
  const sessionToken = window.sessionStorage.getItem("Token");
//   console.log("Protected", token);

  if (!token && !sessionToken) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
