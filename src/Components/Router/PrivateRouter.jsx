import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Loading";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();
  console.log(location);

  if (loading) {
    return <Loading />;
  }

  if (user && user?.email) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default PrivateRouter;
