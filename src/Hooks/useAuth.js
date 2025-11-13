import { useContext } from "react";
import { AuthContext } from "../Components/Context/AuthProvider";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
