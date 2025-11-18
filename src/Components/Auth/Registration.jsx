import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Registration = () => {
  const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
  const [nameError, setNameError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => navigate("/"))
      .catch(console.log);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const pwd = form.password.value;

    if (name.length < 5) {
      setNameError("Name must be at least 5 characters");
      return;
    } else setNameError("");

    if (!validatePassword(pwd)) {
      alert("Password must be 6+ chars with uppercase & lowercase");
      return;
    }

    createUser(email, pwd)
      .then((result) => updateUser({ displayName: name, photoURL: photo }))
      .then(() => navigate("/"))
      .catch((err) => alert(err.message));
  };

  return (
    <div className="bg-base-200 flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <h2 className="font-semibold text-2xl text-center pt-4">Register</h2>
        <form onSubmit={handleRegister} className="card-body">
          <label className="label">Name</label>
          <input name="name" type="text" className="input" required />
          {nameError && <p className="text-red-500 text-xs">{nameError}</p>}

          <label className="label">Email</label>
          <input name="email" type="email" className="input" required />

          <label className="label">Photo URL</label>
          <input name="photo" type="text" className="input" required />

          <label className="label">Password</label>
          <input
            name="password"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {password && !validatePassword(password) && (
            <p className="text-red-500 text-xs mt-1">
              Password must be 6+ chars, include uppercase & lowercase
            </p>
          )}

          <button type="submit" className="btn btn-primary mt-4">
            Register
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline btn-primary mt-4"
          >
            <FcGoogle size={24} /> Login With Google
          </button>

          <p className="text-center pt-3">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-red-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
