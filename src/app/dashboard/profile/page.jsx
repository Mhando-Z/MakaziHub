"use client";

import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import UserContext from "@/context/UserContext";
import { supabase2 } from "@/Config/Supabase";

const ProfilePage = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    national_id: "",
    gender: "",
    professional: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [passwordMessage, setPasswordMessage] = useState({
    text: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Initialize form data when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        full_name: userData.full_name || "",
        phone_number: userData.phone_number || "",
        email: userData.email || "",
        national_id: userData.national_id || "",
        gender: userData.gender || "",
        professional: userData.professional || "",
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    if (!userData?.id) {
      setMessage({
        text: "User ID not found. Please log in again.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase2
        .from("profile")
        .update({
          full_name: formData.full_name,
          phone_number: formData.phone_number,
          email: formData.email,
          national_id: formData.national_id,
          gender: formData.gender,
          professional: formData.professional,
        })
        .eq("id", userData.id)
        .select();

      if (error) throw error;

      // Update context with the new data
      setUserData((prev) => ({
        ...prev,
        ...formData,
      }));

      setMessage({
        text: "Profile updated successfully!",
        type: "success",
      });
    } catch (error) {
      setMessage({
        text: error?.message || "An error occurred while updating your profile",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage({ text: "", type: "" });

    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({
        text: "New passwords do not match",
        type: "error",
      });
      setPasswordLoading(false);
      return;
    }

    // Validate password strength
    if (passwordData.newPassword.length < 8) {
      setPasswordMessage({
        text: "Password must be at least 8 characters long",
        type: "error",
      });
      setPasswordLoading(false);
      return;
    }

    try {
      const { error } = await supabase2.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (error) throw error;

      setPasswordMessage({
        text: "Password updated successfully!",
        type: "success",
      });

      // Clear form fields after successful update
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setPasswordMessage({
        text:
          error?.message || "An error occurred while updating your password",
        type: "error",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format phone number nicely
  const formatPhoneNumber = (phone) => {
    if (!phone) return "N/A";
    // Format as +255 XXX XXX XXX if it's a Tanzanian number
    if (phone.startsWith("0")) {
      return `+255 ${phone.substring(1, 4)} ${phone.substring(
        4,
        7
      )} ${phone.substring(7)}`;
    }
    return phone;
  };

  // Map role to a more readable format with proper capitalization
  const getRoleDisplay = (role) => {
    if (!role) return "N/A";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const profileData = {
    name: userData?.full_name || "N/A",
    role: getRoleDisplay(userData?.role),
    gender: userData?.gender
      ? userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)
      : "N/A",
    phone: formatPhoneNumber(userData?.phone_number),
    email: userData?.email || "N/A",
    nationalId: userData?.national_id || "N/A",
    memberId: userData?.lords_id || "N/A",
    joinDate: formatDate(userData?.created_at),
    professional: userData?.professional || "N/A",
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  // Get appropriate badge color based on role
  const getBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case "landlord":
        return "bg-indigo-100 text-indigo-800";
      case "tenant":
        return "bg-green-100 text-green-800";
      case "admin":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Choose avatar based on gender
  const getAvatarUrl = (gender) => {
    if (gender?.toLowerCase() === "female") {
      return "/api/placeholder/200/200?text=F";
    }
    return "/api/placeholder/200/200?text=M";
  };

  // Tab links for navigation
  const tabs = [
    { id: "Overview", label: "Overview" },
    { id: "Edit Profile", label: "Edit Profile" },
    { id: "Change Password", label: "Change Password" },
  ];

  // Function to render the appropriate tab content

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="mb-6">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 mb-6">
                <div className="relative">
                  <motion.img
                    className="object-cover h-20 border-4 border-green-300 rounded-full md:h-20"
                    src={`https://ui-avatars.com/api/?name=${userData?.email}&background=EEF2FF&color=6366F1`}
                    alt="User Avatar"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {profileData.name}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div
                      className={`px-3 py-1 text-sm font-medium rounded-full ${getBadgeColor(
                        userData?.role
                      )}`}
                    >
                      {profileData.role}
                    </div>
                    {userData?.professional && (
                      <div className="px-3 py-1 text-sm font-medium bg-yellow-100 rounded-full text-yellow-800">
                        {profileData.professional}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Account Summary
              </h3>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex flex-wrap gap-4">
                  <div className="px-3 py-1 text-sm font-medium bg-blue-100 rounded-full text-blue-800">
                    Joined: {profileData.joinDate}
                  </div>
                  <div
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getBadgeColor(
                      userData?.role
                    )}`}
                  >
                    {profileData.role}
                  </div>
                  {userData?.professional && (
                    <div className="px-3 py-1 text-sm font-medium bg-yellow-100 rounded-full text-yellow-800">
                      Professional
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="mb-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Profile Details
              </h3>
              <div className="overflow-hidden bg-white rounded-lg shadow">
                <div className="space-y-0">
                  {[
                    {
                      label: "Full Name",
                      value: profileData.name,
                      icon: "user",
                    },
                    {
                      label: "Role",
                      value: profileData.role,
                      icon: "briefcase",
                    },
                    {
                      label: "Gender",
                      value: profileData.gender,
                      icon: "users",
                    },
                    { label: "Phone", value: profileData.phone, icon: "phone" },
                    { label: "Email", value: profileData.email, icon: "mail" },
                    {
                      label: "Member ID",
                      value: profileData.memberId,
                      icon: "id-card",
                    },
                    {
                      label: "National ID",
                      value: profileData.nationalId,
                      icon: "id-badge",
                    },
                    {
                      label: "Joined Date",
                      value: profileData.joinDate,
                      icon: "calendar",
                    },
                  ].map((detail, index) => (
                    <motion.div
                      key={detail.label}
                      variants={item}
                      className={`flex items-center p-4 border-b border-gray-100 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <div className="flex items-center w-10 h-10 mr-4 text-blue-500 bg-blue-100 rounded-full justify-center">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {detail.icon === "user" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          )}
                          {detail.icon === "phone" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          )}
                          {detail.icon === "mail" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          )}
                          {detail.icon === "id-card" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                            />
                          )}
                          {detail.icon === "id-badge" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                            />
                          )}
                          {detail.icon === "calendar" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          )}
                          {detail.icon === "briefcase" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          )}
                          {detail.icon === "users" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          )}
                        </svg>
                      </div>
                      <div className="flex-1">
                        <span className="block text-sm font-medium text-gray-500">
                          {detail.label}
                        </span>
                        <span className="block mt-1 text-sm font-medium text-gray-900">
                          {detail.value}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {userData?.role === "landlord" && (
              <motion.div variants={item} className="mb-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  Property Information
                </h3>
                <div className="p-6 bg-white rounded-lg shadow">
                  {userData?.house_id ? (
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 mr-4 text-green-500 bg-green-100 rounded-full">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-500">
                          House ID
                        </span>
                        <span className="block mt-1 text-sm font-medium text-gray-900">
                          {userData.house_id}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-center justify-center w-10 h-10 mr-4 text-yellow-500 bg-yellow-100 rounded-full">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-yellow-800">
                          No property registered
                        </span>
                        <span className="block mt-1 text-sm text-yellow-700">
                          Register a property to start listing rooms and
                          managing tenants.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      case "Edit Profile":
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {message.text && (
                <div
                  className={`p-4 rounded-lg ${
                    message.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="full_name"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 outline-0 text-gray-900 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone_number"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 outline-0 text-gray-900 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 outline-0 text-gray-900 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label
                    htmlFor="national_id"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    National ID
                  </label>
                  <input
                    type="text"
                    id="national_id"
                    value={formData.national_id}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 outline-0 text-gray-900 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 outline-0 text-gray-900 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="professional"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Professional
                  </label>
                  <input
                    type="text"
                    id="professional"
                    value={formData.professional}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 outline-0 text-gray-900 border border-gray-300 rounded-lg"
                    placeholder="E.g. Engineer, Doctor, etc."
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating Profile...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        );
      case "Change Password":
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <form onSubmit={handlePasswordChange} className="space-y-6">
              {passwordMessage.text && (
                <div
                  className={`p-4 rounded-lg ${
                    passwordMessage.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {passwordMessage.text}
                </div>
              )}

              <div className="p-4 mb-6 border-l-4 border-blue-500 bg-blue-50">
                <p className="text-sm text-blue-700">
                  Update your password to keep your account secure. Use a strong
                  password that you don't use elsewhere.
                </p>
              </div>

              <div>
                <label
                  htmlFor="currentPassword"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="block w-full px-4 py-2 outline-0 text-gray-900 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="block w-full px-4 py-2 outline-0 text-gray-900 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="block w-full px-4 py-2 outline-0 text-gray-900 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className={`inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    passwordLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {passwordLoading ? (
                    <>
                      <svg
                        className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating Password...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your personal information and account settings.
          </p>
        </div>

        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
