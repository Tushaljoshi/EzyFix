import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const generateUsername = (first, last) => {
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `${first.toLowerCase()}${last.toLowerCase()}${randomNum}`;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOTP, setEnteredOTP] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendOTP = () => {
    if (!phone.match(/^[6-9]\d{9}$/)) {
      alert("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    setOtpSent(true);
    alert(`OTP sent to ${phone}: ${otp}`); // Simulate SMS
  };

  const verifyOTP = () => {
    if (enteredOTP === generatedOTP) {
      setOtpVerified(true);
      alert("Phone number verified successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = {
      id: Math.floor(Math.random() * 100000),
      name: `${firstName} ${lastName}`,
      username,
      email,
      phone,
      password,
      wallet: 0,
      avatar: `https://i.pravatar.cc/150?u=${email}`,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    alert("Account created successfully!");
    navigate("/");
  };

  const handleNameChange = (f, l) => {
    const uname = generateUsername(f, l);
    setUsername(uname);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-brandBlue mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 px-4 py-2 border rounded-md"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                handleNameChange(e.target.value, lastName);
              }}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 px-4 py-2 border rounded-md"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                handleNameChange(firstName, e.target.value);
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <div className="flex">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-l-md"
              />
              <button
                type="button"
                onClick={() => setUsername(generateUsername(firstName, lastName))}
                className="bg-brandBlue text-white px-3 rounded-r-md text-sm"
              >
                Regenerate
              </button>
            </div>
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-2/3 px-4 py-2 border rounded-md"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={sendOTP}
              className="bg-brandBlue text-white px-3 rounded text-sm"
            >
              Send OTP
            </button>
          </div>

          {otpSent && !otpVerified && (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-2/3 px-4 py-2 border rounded-md"
                value={enteredOTP}
                onChange={(e) => setEnteredOTP(e.target.value)}
              />
              <button
                type="button"
                onClick={verifyOTP}
                className="bg-green-600 text-white px-3 rounded text-sm"
              >
                Verify
              </button>
            </div>
          )}

          {otpVerified && (
            <>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-brandBlue text-white py-2 rounded-md hover:bg-[#2DA7ED] transition"
              >
                Sign Up
              </button>
            </>
          )}
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-brandBlue hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
