import { AuthContext } from "./Context/AuthContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/router";

const App = () => {
  const user = { name: "bablu mia" };
  const loading = false;

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
