import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const Registration = () => {
  return (
    <div className="bg-base-200 flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h2 className="font-semibold text-2xl text-center py-2">
          Register your account
        </h2>
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" />
            <button className="btn btn-primary mt-4">Register</button>
            <button className="btn btn-primary btn-outline mt-4">
              <FcGoogle size={24} /> Login With Google
            </button>
            <p className="font-semibold text-center pt-3">
              Don't Have An Account ?{" "}
              <Link to="/auth/login" className="text-red-500">
                Login
              </Link>
            </p>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Registration;
