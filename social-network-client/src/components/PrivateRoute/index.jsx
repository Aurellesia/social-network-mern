import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const getToken = () => {
    let token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
    return token;
  };
  const isAuthenticate = getToken();
  return isAuthenticate ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
