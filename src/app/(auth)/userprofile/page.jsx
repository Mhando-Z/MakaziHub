"use client";

import React, { useContext, useState } from "react";
import {
  CircleUserRound,
  Loader,
  SendHorizonal,
  User,
  UserCog,
} from "lucide-react";
import { motion } from "framer-motion";
import UserContext from "@/context/UserContext";
import { supabase2 } from "@/Config/Supabase";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function UserProfile() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const route = useRouter();
  const [Userdata, setData] = useState({
    full_name: "",
    phone_number: "",
    gender: "",
    lords_id: "",
    room_id: "",
    role: "",
    national_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setData((prevData) => ({
      ...prevData,
      role: role,
    }));
  };

  const handleProfile = async () => {
    if (selectedRole === "landlord") {
      const { data, error } = await supabase2
        .from("profiles")
        .insert([
          {
            id: user?.id,
            full_name: Userdata.full_name,
            phone_number: Userdata.phone_number,
            gender: Userdata.gender,
            role: "landlord",
          },
        ])
        .select();
      if (error) {
        toast.error("Error inserting data:", error.message);
        setLoading(false);
      } else {
        toast.success("Data inserted successfully");
        getProfile();
        setLoading(false);
        route.replace("dashboard/home");
      }
    } else if (selectedRole === "tenant") {
      const { data, error } = await supabase2
        .from("tenant")
        .insert([
          {
            id: user?.id,
            full_name: Userdata.fullname,
            phone_number: Userdata.phonenumber,
            national_id: Userdata.national_id || null,
            room_id: Userdata.room_id || null,
            lords_id: Userdata.lords_id || null,
            gender: Userdata.gender,
            role: "tenant",
          },
        ])
        .select();
      if (error) {
        toast.error("Error inserting data:", error.message);
        setLoading(false);
      } else {
        toast.success("Data inserted successfully");
        getProfile();
        setLoading(false);
        route.replace("dashboard/home");
      }
    }
  };

  // handles default actions of login form
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    handleProfile();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="flex flex-col w-full container mx-auto p-8">
        {selectedRole && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center w-full"
            >
              <CircleUserRound size={100} color="#4CAF50" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl mt-4 font-raleway text-blue-950 font-medium text-center"
            >
              Create User Profile
            </motion.h2>
          </>
        )}

        {/* Role Selection */}
        {!selectedRole && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 w-full max-w-md mx-auto"
          >
            <h3 className="text-2xl md:text-3xl  font-raleway font-medium text-center mb-10 text-gray-700">
              Please select your role
            </h3>
            <div className="flex flex-col md:flex-row gap-5 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoleSelection("landlord")}
                className="flex flex-row gap-5 py-2 px-5 items-center justify-center bg-white  rounded-xs  transition-all border-2 border-transparent hover:border-green-500"
              >
                <UserCog size={48} className="text-green-600 mb-2" />
                <span className="text-lg font-medium">Landlord</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoleSelection("tenant")}
                className="flex flex-row gap-5 py-2 px-5 items-center justify-center bg-white  rounded-xs  transition-all border-2 border-transparent hover:border-green-500"
              >
                <CircleUserRound size={48} className="text-blue-600 mb-2" />
                <span className="text-lg font-medium">Tenant</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* User profile form - only show if a role is selected */}
        {selectedRole && (
          <motion.div className="w-full mt-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Landlord Form */}
              {selectedRole === "landlord" && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="w-full mb-6 mt-2"
                  >
                    <h1 className="font-bold">{selectedRole}</h1>
                  </motion.div>
                  <div className="flex w-full flex-col md:flex-row items-center justify-between md:gap-x-10 gap-5">
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="w-full"
                    >
                      <label
                        htmlFor="fullname"
                        className="block text-sm font-medium leading-6 text-gray-900 md:text-md  "
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <motion.input
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "100%" }}
                          whileFocus={{ width: [0, "100%"] }}
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut",
                          }}
                          id="fullname"
                          name="fullname"
                          onChange={handleChange}
                          type="text"
                          required
                          autoComplete="fullname"
                          className="block px-1 w-full py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="w-full"
                    >
                      <label
                        htmlFor="phonenumber"
                        className="block text-sm font-medium leading-6 text-gray-900 md:text-md  "
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <motion.input
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "100%" }}
                          whileFocus={{ width: [0, "100%"] }}
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut",
                          }}
                          id="phonenumber"
                          placeholder="e.g. +255 123 456 789"
                          name="phonenumber"
                          onChange={handleChange}
                          type="text"
                          required
                          autoComplete="phonenumber"
                          className="block px-1 w-full py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="w-full"
                    >
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium leading-6 text-gray-900 md:text-md  "
                      >
                        Gender
                      </label>
                      <div className="mt-2">
                        <select
                          id="gender"
                          name="gender"
                          onChange={handleChange}
                          className="block px-1 w-full py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          required
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </motion.div>
                  </div>
                </>
              )}

              {/* Tenant Form */}
              {selectedRole === "tenant" && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="w-full mb-6 mt-2"
                  >
                    <h1 className="font-bold">{selectedRole}</h1>
                  </motion.div>

                  <div className="flex w-full flex-col gap-5">
                    <div className="flex flex-col md:flex-row items-center justify-between md:gap-x-10 gap-5">
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="w-full"
                      >
                        <label
                          htmlFor="fullname"
                          className="block text-sm font-medium leading-6 text-gray-900 md:text-md  "
                        >
                          Full Name
                        </label>
                        <div className="mt-2">
                          <motion.input
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "100%" }}
                            whileFocus={{ width: [0, "100%"] }}
                            transition={{
                              duration: 0.5,
                              ease: "easeInOut",
                            }}
                            id="fullname"
                            name="fullname"
                            onChange={handleChange}
                            type="text"
                            required
                            autoComplete="fullname"
                            className="block px-1 w-full py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="w-full"
                      >
                        <label
                          htmlFor="phonenumber"
                          className="block text-sm font-medium leading-6 text-gray-900 md:text-md  "
                        >
                          Phone Number
                        </label>
                        <div className="mt-2">
                          <motion.input
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "100%" }}
                            whileFocus={{ width: [0, "100%"] }}
                            transition={{
                              duration: 0.5,
                              ease: "easeInOut",
                            }}
                            id="phonenumber"
                            placeholder="e.g. +255 123 456 789"
                            name="phone_number"
                            onChange={handleChange}
                            type="text"
                            required
                            autoComplete="phonenumber"
                            className="block px-1 w-full py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between md:gap-x-10 gap-5">
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                      >
                        <label
                          htmlFor="lords_id"
                          className="block text-sm font-medium leading-6 text-gray-900 md:text-md  "
                        >
                          LandLord ID <span>(optional)</span>
                        </label>
                        <div className="mt-2">
                          <motion.input
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "100%" }}
                            whileFocus={{ width: [0, "100%"] }}
                            transition={{
                              duration: 0.5,
                              ease: "easeInOut",
                            }}
                            id="lords_id"
                            name="lords_id"
                            onChange={handleChange}
                            type="text"
                            autoComplete="lords_id"
                            className="block px-1 w-full py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="w-full"
                      >
                        <label
                          htmlFor="national_id"
                          className="block text-sm font-medium leading-6 text-gray-900 md:text-md  "
                        >
                          National ID
                        </label>
                        <div className="mt-2">
                          <motion.input
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "100%" }}
                            whileFocus={{ width: [0, "100%"] }}
                            transition={{
                              duration: 0.5,
                              ease: "easeInOut",
                            }}
                            id="national_id"
                            name="national_id"
                            onChange={handleChange}
                            type="text"
                            autoComplete="national_id"
                            className="block px-1 w-full py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </motion.div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between md:gap-x-10 gap-5">
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                      >
                        <label
                          htmlFor="room_id"
                          className="block text-sm font-medium leading-6 text-gray-900 md:text-md  "
                        >
                          Room ID <span>(optional)</span>
                        </label>
                        <div className="mt-2">
                          <motion.input
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "100%" }}
                            whileFocus={{ width: [0, "100%"] }}
                            transition={{
                              duration: 0.5,
                              ease: "easeInOut",
                            }}
                            id="room_id"
                            name="room_id"
                            onChange={handleChange}
                            type="text"
                            autoComplete="room_id"
                            className="block px-1 w-full py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </motion.div>
                      {/* tenant gender selection */}
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="w-full"
                      >
                        <label
                          htmlFor="gender"
                          className="block text-sm font-medium leading-6 text-gray-900 md:text-md  "
                        >
                          Gender
                        </label>
                        <div className="mt-2">
                          <select
                            id="gender"
                            name="gender"
                            onChange={handleChange}
                            className="block px-1 w-full py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            required
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </>
              )}

              {/* Back button to change role */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex w-full justify-between items-center"
              >
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedRole("")}
                  className="text-sm text-green-700 cursor-pointer hover:text-green-800 font-medium underline"
                >
                  Change Role
                </motion.button>

                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", ease: "easeOut" }}
                  className={`flex justify-center rounded-md px-7 ${
                    loading
                      ? "bg-gray-200 cursor-not-allowed "
                      : "bg-green-600 hover:bg-green-700"
                  }  px-3 py-1 text-sm cursor-pointer font-semibold leading-6 text-white focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center cursor-not-allowed">
                      <Loader className="animate-spin text-2xl text-green-600 [animation-duration:0.6s]" />
                    </div>
                  ) : (
                    <span className="relative flex flex-row items-center gap-2 z-10">
                      Save Profile
                      <SendHorizonal size={20} className="text-sm" />
                    </span>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
