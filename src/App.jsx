import Navbar from "./Components/Navbar"
import React from "react";
import Login from "./Components/Login"
import Register  from "./Components/Register";
import Dashboard  from "./Components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Crud from "./Components/crud"
   function App() {
  return (
    <BrowserRouter>

      <Routes>
        
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
   
  );
}
 
export default App;