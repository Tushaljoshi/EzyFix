import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
      setEditedUser(storedUser);
    }
  }, []);

  const generateOTP = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    alert("OTP sent to your email: " + newOtp);
  };

  const verifyOTP = () => {
    if (otp === generatedOtp) {
      setOtpVerified(true);
      alert("OTP verified successfully.");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = { ...user, avatar: reader.result };
      setUser(updatedUser);
      setEditedUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    if (
      editedUser.password !== user.password &&
      (verifyEmail !== user.email || verifyPassword !== user.password || !otpVerified)
    ) {
      alert("Verification failed. Please enter correct email, password, and OTP.");
      return;
    }

    const { password, ...safeUser } = editedUser;
    setUser(safeUser);
    localStorage.setItem("user", JSON.stringify(editedUser));
    localStorage.setItem("loggedInUser", JSON.stringify(editedUser));
    setEditMode(false);
    setOtpVerified(false);
    alert("Profile updated!");
  };

  const handleSignOut = () => {
    localStorage.clear();
    alert("Signed out. All user data and coupon history cleared.");
    window.location.reload();
  };

  return (
    <div className="bg-[#f9fbfd] min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-brandBlue">Account Settings</h1>

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <label className="relative group">
              <img
                src={user}
                alt="your Profile"
                className="w-50 h-50rounded-full object-cover border cursor-pointer hover:opacity-80"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition text-sm text-white rounded-full font-bold">
                Change
              </div>
            </label>

            <div className="w-full font-bold">
              {editMode ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name || ""}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email || ""}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                    placeholder="Email Address"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={editedUser.phone || ""}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                    placeholder="Mobile Number"
                  />
                  <input
                    type="text"
                    name="address"
                    value={editedUser.address || ""}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                    placeholder="Address"
                  />
                  <input
                    type="date"
                    name="dob"
                    value={editedUser.dob || ""}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                  />
                  <input
                    type="text"
                    name="gender"
                    value={editedUser.gender || ""}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                    placeholder="Gender"
                  />

                  <div className="border-t pt-4">
                    <input
                      type="email"
                      value={verifyEmail}
                      onChange={(e) => setVerifyEmail(e.target.value)}
                      className="w-full border px-3 py-2 rounded mb-2"
                      placeholder="Enter your current email to verify"
                    />
                    <input
                      type="password"
                      value={verifyPassword}
                      onChange={(e) => setVerifyPassword(e.target.value)}
                      className="w-full border px-3 py-2 rounded mb-2"
                      placeholder="Enter current password to verify"
                    />
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Enter OTP"
                      />
                      <button
                        onClick={generateOTP}
                        className="bg-blue-500 text-white px-3 py-1 rounded font-bold hover:bg-blue-600"
                      >
                        Send OTP
                      </button>
                      <button
                        onClick={verifyOTP}
                        className="bg-green-600 text-white px-3 py-1 rounded font-bold hover:bg-green-700"
                      >
                        Verify OTP
                      </button>
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={editedUser.password || ""}
                      onChange={handleInputChange}
                      className="w-full border px-3 py-2 rounded"
                      placeholder="New Password"
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-center">{user?.name || "Guest User"}</h2>
                  <p className="text-sm text-center">{user?.email || "user@example.com"}</p>
                  <p className="text-sm text-center">{user?.phone || "No mobile number"}</p>
                  {user?.address && <p className="text-sm text-center">{user.address}</p>}
                  {user?.dob && <p className="text-sm text-center">DOB: {user.dob}</p>}
                  {user?.gender && <p className="text-sm text-center">Gender: {user.gender}</p>}
                </>
              )}
            </div>

            <div className="flex gap-4 mt-4">
              {editMode ? (
                <button
                  onClick={handleSaveProfile}
                  className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-brandBlue text-white px-6 py-2 rounded font-bold hover:bg-[#2DA7ED]"
                >
                  Edit Profile
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-6 py-2 rounded font-bold hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
