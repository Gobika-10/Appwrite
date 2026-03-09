import React, { useState, useEffect } from "react";
import { account } from "../app/appwrite";
import { OAuthProvider } from "appwrite";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Check existing session
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await account.get();
        console.log("User already logged in:", user);
        navigate("/dashboard");
      } catch (error) {
        console.log("No active session");
      }
    };

    checkUser();
  }, [navigate]);

  // Email Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await account.createEmailPasswordSession(email, password);
      alert("Login Successful");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Google Login
  const loginWithGoogle = () => {
     account.createOAuth2Session(
      "google",
      `${window.location.origin}/dashboard`,
      `${window.location.origin}/login`,
    );
  };

  // Github Login
  const loginWithGithub = () => {
    account.createOAuth2Session(
      "github",
      `${window.location.origin}/dashboard`,
      `${window.location.origin}/login`,
      );
  };

  return (

    <div className="flex items-center justify-center min-h-screen">

      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-2xl p-8 w-[350px] flex flex-col gap-5"
      >

        <h2 className="text-2xl font-bold text-center text-gray-700">
          Welcome Back
        </h2>

        <p className="text-center text-sm text-gray-500">
          Login to your account
        </p>

        <input
          type="email"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg transition duration-200"
        >
          Login
        </button>

        <div className="flex items-center gap-2">
          <hr className="flex-1"/>
          <span className="text-gray-400 text-sm">OR</span>
          <hr className="flex-1"/>
        </div>

        {/* Social Login */}
        <div className="flex gap-4 justify-center">

          <button
            type="button"
            onClick={loginWithGoogle}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle size={20}/>
            Google
          </button>

          <button
            type="button"
            onClick={loginWithGithub}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <FaGithub size={20}/>
            Github
          </button>

        </div>

        <p className="text-center text-sm text-gray-500">
          Don't have an account? 
          <span
            onClick={() => navigate("/")}
            className="text-blue-500 cursor-pointer hover:underline ml-1"
          >
            Register
          </span>
        </p>

      </form>

    </div>
  );
}


export default Login;

