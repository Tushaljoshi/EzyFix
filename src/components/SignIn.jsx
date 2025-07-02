import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOTP, setEnteredOTP] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found. Please sign up first.");
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
      alert("Login successful!");
      navigate("/profile");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.email !== email) {
      alert("Email not found.");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    setOtpSent(true);

    // In real app, send OTP via email service
    alert(`Your OTP is: ${otp}`);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (enteredOTP !== generatedOTP) {
      alert("Incorrect OTP");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    storedUser.password = newPassword;
    localStorage.setItem("user", JSON.stringify(storedUser));

    alert("Password reset successful!");
    setResetMode(false);
    setOtpSent(false);
    setEmail("");
    setNewPassword("");
    setEnteredOTP("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-brandBlue mb-6">
          {resetMode ? "Reset Password" : "Sign In to EzyFix"}
        </h2>

        {!resetMode ? (
          // --------- LOGIN FORM ---------
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandBlue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandBlue"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brandBlue text-white py-2 rounded-md hover:bg-[#2DA7ED] transition"
            >
              Sign In
            </button>
          </form>
        ) : !otpSent ? (
          // --------- SEND OTP FORM ---------
          <form className="space-y-4" onSubmit={handleSendOTP}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter your email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandBlue"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brandBlue text-white py-2 rounded-md hover:bg-[#2DA7ED] transition"
            >
              Send OTP
            </button>
          </form>
        ) : (
          // --------- VERIFY OTP FORM ---------
          <form className="space-y-4" onSubmit={handleVerifyOTP}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
              <input
                type="text"
                value={enteredOTP}
                onChange={(e) => setEnteredOTP(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandBlue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandBlue"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brandBlue text-white py-2 rounded-md hover:bg-[#2DA7ED] transition"
            >
              Reset Password
            </button>
          </form>
        )}

        <div className="flex justify-between mt-4 text-sm">
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-brandBlue hover:underline">
              Sign Up
            </Link>
          </p>
          <button
            onClick={() => {
              setResetMode(!resetMode);
              setOtpSent(false);
              setEnteredOTP("");
              setNewPassword("");
            }}
            className="text-brandBlue hover:underline"
          >
            {resetMode ? "Back to Login" : "Forgot Password?"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
