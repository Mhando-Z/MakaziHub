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
import { IoPerson } from "react-icons/io5";

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
    house_id: "",
    profession: "",
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
            national_id: Userdata.national_id || null,
            room_id: Userdata.room_id || null,
            lords_id: Userdata.lords_id || null,
            email: user?.email,
            role: "landlord",
          },
        ])
        .select();
      if (error) {
        toast.error("Error inserting data:", error.message);
        setLoading(false);
      } else {
        setLoading(false);
        route.replace("/loading/");
        toast.success("Data inserted successfully");
        getProfile();
      }
    } else if (selectedRole === "tenant") {
      const { data, error } = await supabase2
        .from("profiles")
        .insert([
          {
            id: user?.id,
            full_name: Userdata.full_name,
            phone_number: Userdata.phone_number,
            national_id: Userdata.national_id || null,
            room_id: Userdata.room_id || null,
            lords_id: Userdata.lords_id || null,
            gender: Userdata.gender,
            email: user?.email,
            role: "tenant",
            professional: Userdata.profession,
          },
        ])
        .select();
      if (error) {
        toast.error("Error inserting data:", error.message);
        setLoading(false);
      } else {
        setLoading(false);
        route.replace("/loading/");
        toast.success("Data inserted successfully");
        getProfile();
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
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center rounded-full p-2 px-3 border border-green-600 justify-center"
            >
              <IoPerson className="md:text-7xl text-5xl text-green-600 mb-2" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg mt-4 font-raleway text-blue-950 font-medium text-center"
            >
              Create User Profile
            </motion.h2>
          </div>
        )}

        {/* Role Selection */}
        {!selectedRole && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 w-full max-w-md mx-auto"
          >
            <h3 className="text-lg md:text-xl font-raleway font-medium text-center mb-10 text-gray-700">
              Please select your role
            </h3>
            <div className="flex flex-col md:flex-row gap-5 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoleSelection("landlord")}
                className="flex flex-row gap-5 py-1 md:py-2 px-5 items-center justify-center bg-white  rounded-xs  transition-all border-2 border-transparent hover:border-green-500"
              >
                <UserCog size={38} className="text-green-600 mb-2" />
                <span className="text-xs md:text-sm md:text-md font-medium">
                  Landlord
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoleSelection("tenant")}
                className="flex flex-row gap-5 py-1 md:py-2 px-5 items-center justify-center bg-white  rounded-xs  transition-all border-2 border-transparent hover:border-green-500"
              >
                <CircleUserRound size={38} className="text-blue-600 mb-2" />
                <span className="text-xs md:text-sm md:text-md font-medium">
                  Tenant
                </span>
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
                    className="w-full mb-6  "
                  >
                    <h1 className="font-bold text-sm md:text-base">
                      {selectedRole}
                    </h1>
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
                        className="block text-xs md:text-sm font-medium leading-6 text-gray-900 md:text-md"
                      >
                        Full Name
                      </label>
                      <div className="">
                        <motion.input
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "100%" }}
                          whileFocus={{ width: [0, "100%"] }}
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut",
                          }}
                          id="full_name"
                          name="full_name"
                          onChange={handleChange}
                          type="text"
                          required
                          autoComplete="full_name"
                          className="block px-1 w-full py-1 md:py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-xs md:text-sm sm:leading-6"
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
                        className="block text-xs md:text-sm font-medium leading-6 text-gray-900 md:text-md"
                      >
                        Phone Number
                      </label>
                      <div className="">
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
                          className="block px-1 w-full py-1 md:py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-xs md:text-sm sm:leading-6"
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
                        className="block text-xs md:text-sm font-medium leading-6 text-gray-900 md:text-md"
                      >
                        Gender
                      </label>
                      <div className=" ">
                        <select
                          id="gender"
                          name="gender"
                          onChange={handleChange}
                          className="block px-1 w-full py-1 md:py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-xs md:text-sm sm:leading-6"
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
                    className="w-full mb-6  "
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
                          className="block text-xs md:text-sm font-medium leading-6 text-gray-900 md:text-md  "
                        >
                          Full Name
                        </label>
                        <div className=" ">
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
                            className="block px-1 w-full py-1 md:py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-xs md:text-sm sm:leading-6"
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
                          className="block text-xs md:text-sm font-medium leading-6 text-gray-900 md:text-md  "
                        >
                          Phone Number
                        </label>
                        <div className="">
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
                            className="block px-1 w-full py-1 md:py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-xs md:text-sm sm:leading-6"
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
                          className="block text-xs md:text-sm font-medium leading-6 text-gray-900 md:text-md"
                        >
                          LandLord ID <span>(optional)</span>
                        </label>
                        <div className="">
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
                            className="block px-1 w-full py-1 md:py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-xs md:text-sm sm:leading-6"
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
                          className="block text-xs md:text-sm font-medium leading-6 text-gray-900 md:text-md"
                        >
                          National ID
                        </label>
                        <div className=" ">
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
                            className="block px-1 w-full py-1 md:py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-xs md:text-sm sm:leading-6"
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
                          className="block text-xs md:text-sm font-medium leading-6 text-gray-900 md:text-md  "
                        >
                          Room ID <span>(optional)</span>
                        </label>
                        <div className=" ">
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
                            className="block px-1 w-full py-1 md:py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-xs md:text-sm sm:leading-6"
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
                          className="block text-xs md:text-sm font-medium leading-6 text-gray-900 md:text-md"
                        >
                          Gender
                        </label>
                        <div className="">
                          <select
                            id="gender"
                            name="gender"
                            onChange={handleChange}
                            className="block px-1 w-full py-1 md:py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-xs md:text-sm sm:leading-6"
                            required
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
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
                          htmlFor="house_id"
                          className="block text-xs md:text-sm font-medium leading-6 text-gray-900 md:text-md"
                        >
                          House ID <span>(optional)</span>
                        </label>
                        <div className="">
                          <motion.input
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "100%" }}
                            whileFocus={{ width: [0, "100%"] }}
                            transition={{
                              duration: 0.5,
                              ease: "easeInOut",
                            }}
                            id="house_id"
                            name="house_id"
                            onChange={handleChange}
                            type="text"
                            autoComplete="house_id"
                            className="block px-1 w-full py-1 md:py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-xs md:text-sm sm:leading-6"
                          />
                        </div>
                      </motion.div>
                      {/* tenant gender selection */}
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="w-full"
                      >
                        <label
                          htmlFor="profession"
                          className="block text-xs md:text-sm font-medium leading-6 text-gray-900 md:text-md"
                        >
                          Profession
                        </label>
                        <div className="">
                          <select
                            id="profession"
                            name="profession"
                            onChange={handleChange}
                            className="block px-1 w-full py-1 md:py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-xs md:text-sm sm:leading-6"
                            required
                          >
                            <option value="" disabled selected>
                              Select your profession
                            </option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher / Lecturer</option>
                            <option value="researcher">
                              Academic Researcher
                            </option>
                            <option value="government">
                              Government Employee
                            </option>
                            <option value="ngo">NGO / Non-profit Worker</option>
                            <option value="private">
                              Private Sector Employee
                            </option>
                            <option value="entrepreneur">
                              Self-Employed / Entrepreneur
                            </option>
                            <option value="healthcare">
                              Healthcare Professional
                            </option>
                            <option value="engineer">
                              Engineer / Technician
                            </option>
                            <option value="legal">Legal Professional</option>
                            <option value="farmer">
                              Farmer / Agricultural Worker
                            </option>
                            <option value="artisan">
                              Artisan / Skilled Laborer
                            </option>
                            <option value="retired">Retired</option>
                            <option value="unemployed">Unemployed</option>
                            <option value="other">Other</option>
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
                  className="text-xs md:text-sm text-green-700 cursor-pointer hover:text-green-800 font-medium underline"
                >
                  Change Role
                </motion.button>

                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", ease: "easeOut" }}
                  className={`flex justify-center text-xs rounded-md px-7 ${
                    loading
                      ? "bg-gray-200 cursor-not-allowed "
                      : "bg-green-600 hover:bg-green-700"
                  }  px-3 py-1 text-xs md:text-sm cursor-pointer font-semibold leading-6 text-white focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center cursor-not-allowed">
                      <Loader className="animate-spin text-2xl text-green-600 [animation-duration:0.6s]" />
                    </div>
                  ) : (
                    <span className="relative flex flex-row items-center gap-2 z-10">
                      Save Profile
                      <SendHorizonal size={16} className="text-xs" />
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
