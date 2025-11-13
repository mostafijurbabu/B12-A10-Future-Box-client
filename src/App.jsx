import { AuthContext } from "./Context/AuthContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/router";
import { Toaster } from "react-hot-toast";

const App = () => {
  const user = { name: "bablu mia" };
  const loading = false;

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </AuthContext.Provider>
  );
};

export default App;
