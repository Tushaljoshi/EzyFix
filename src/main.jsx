import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import "./index.css";
import Profile from "./components/Profile";
import Query from "./components/Query";
import Coupons from "./components/Coupons";
import MyCoupons from "./components/MyCoupons";
import AddCoinsPage from "./components/AddCoinsPage"; 
import TransactionHistory from "./components/TransactionHistory";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/query" element={<Query />} />
        <Route path="/coupons" element={<Coupons />} />    
        <Route path="/my-coupons" element={<MyCoupons />} />
        <Route path="/add-coins" element={<AddCoinsPage />} />
        <Route path="/transactions" element={<TransactionHistory />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
