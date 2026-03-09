import React, { useEffect, useState } from "react";
import { account } from "../app/appwrite";
import { useNavigate } from "react-router-dom";
import Crud from "./crud";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check login session
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await account.get();
        setUser(response);
      } catch (error) {
        console.log("User not logged in");
        navigate("/login");
      }
    };

    checkUser();
  }, [navigate]);

  // Logout function
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");

      alert("Logged out successfully");

      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-gray-100 shadow">
        <h2 className="font-bold text-2xl">Appwrite Dashboard</h2>

        <ul className="flex gap-6 text-lg items-center">
          <li className="cursor-pointer hover:text-blue-500">Home</li>

          <li className="cursor-pointer hover:text-blue-500">About</li>

          <li className="cursor-pointer hover:text-blue-500">Contact</li>

          {/* Logged in user
          {user && (
            <span className="text-sm text-gray-600">
              {user.email}
            </span>
          )} */}

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </ul>
      </nav>

      {/* Dashboard Content */}
      <div className="p-6">
        {/* 
        <h1 className="text-2xl font-bold mb-4">
          Welcome {user?.name || user?.email}
        </h1> */}

        {/* CRUD Component */}
        <Crud />
      </div>
    </div>
  );
}

export default Dashboard;
