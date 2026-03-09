import React, { useState } from "react";
import { account } from "../app/appwrite";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await account.create("unique()", email, password);

      setSuccess("Account created successfully ✅");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">

      <form
        onSubmit={handleRegister}
        className="bg-white shadow-xl rounded-2xl p-8 w-[350px] flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Create Account
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg transition duration-200"
        >
          Register
        </button>

        {success && (
          <p className="text-green-600 text-center text-sm">{success}</p>
        )}

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>

    </div>
  );
}

export default Register;