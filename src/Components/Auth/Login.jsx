import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Login = () => {
  const [error, setError] = useState("");
  const { login, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => navigate(location.state?.from?.pathname || "/"))
      .catch((err) => setError(err.message));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then(() => navigate(location.state?.from?.pathname || "/"))
      .catch((err) => setError(err.message));
  };

  return (
    <div className="bg-base-200 flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <h2 className="text-2xl font-semibold text-center pt-4">Login</h2>
        <form onSubmit={handleLogin} className="card-body">
          <label className="label">Email</label>
          <input name="email" type="email" className="input" required />
          <label className="label">Password</label>
          <input name="password" type="password" className="input" required />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" className="btn btn-primary mt-4">
            Login
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline btn-primary mt-4"
          >
            <FcGoogle size={24} /> Login With Google
          </button>
          <p className="text-center pt-3">
            Don't have an account?{" "}
            <Link to="/auth/registration" className="text-red-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
