"use client";

import React, { useContext, useState } from "react";
import { CircleUserRound } from "lucide-react";
import { motion } from "framer-motion";
import UserContext from "@/context/UserContext";
import Select from "react-select";

function UserProfile() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handles default actions of login form
  const handleSubmit = (e) => {
    e.preventDefault();
    // setPresent(false);
    // setLoading(true);
    // handleRegister();
  };

  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="flex flex-col w-full container mx-auto p-8 ">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center w-full "
        >
          <CircleUserRound size={100} color="#4CAF50" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl  mt-4 font-raleway text-blue-950 font-medium text-center"
        >
          Create User Profile
        </motion.h2>

        {/* user profile form */}
        <div className="w-full mt-10 ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex w-full flex-row items-center justify-between gap-x-10">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full"
              >
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium leading-6 text-gray-900 md:text-md dark:text-gray-400"
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
                  className="block text-sm font-medium leading-6 text-gray-900 md:text-md dark:text-gray-400"
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
                  className="block text-sm font-medium leading-6 text-gray-900 md:text-md dark:text-gray-400"
                >
                  Gender
                </label>
                <div className="mt-2">
                  <select
                    id="gender"
                    name="gender"
                    onChange={handleChange}
                    className="block px-1 w-full py-2 text-gray-400 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-full flex flex-col items-end justify-end "
            >
              <motion.button
                type="submit"
                whileTap={{ scale: 0.8 }}
                transition={{ type: "spring", ease: "easeOut" }}
                className={`flex  justify-center rounded-md px-7 ${
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
                  <span className="relative z-10">Sign Up</span>
                )}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
