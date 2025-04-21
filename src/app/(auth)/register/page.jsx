"use client";

import logo from "../../../../public/Assets/Logo/House.png";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Spinner } from "react-activity";
import { FiEyeOff, FiRefreshCw } from "react-icons/fi";
import { BsEye, BsMailbox, BsQuote } from "react-icons/bs";
import { CheckCircle, Mail, XCircle } from "lucide-react";
import DataContext from "@/context/DataContext";
import { supabase2 } from "@/Config/Supabase";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

// notification component
const MotionCheckCircle = motion(CheckCircle);

export default function UserRegister() {
  const { quotes } = useContext(DataContext);
  const [present, setPresent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setNotification] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [val, setVal] = useState(Math.floor(Math.random() * 100) + 1 || 5);
  // takes userinput
  const [userData, setData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const handleRegister = async () => {
    if (userData.password !== userData.password2) {
      setError("Passwords do not match!");
      setPresent(true);
      setLoading(false);
      return;
    }
    const { email, password } = userData;

    const { data, error } = await supabase2.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      setNotification(true);
      setPresent(false);
      setError("");
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // val change after every 5seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newVal = Math.floor(Math.random() * 100) + 1 || 5;
      setVal(newVal);
    }, 10000); // 5000ms = 5 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setPresent(false);
    setError("");
    setLoading(false);
    setNotification(false);
    redirect("/");
  };

  // handles default actions of login form
  const handleSubmit = (e) => {
    e.preventDefault();
    setPresent(false);
    setLoading(true);
    handleRegister();
  };

  // resend verification email
  const handleClick = async (email) => {
    setIsLoading(true);

    const { data, error } = await supabase2.auth.signInWithOtp({ email });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    } else {
      toast.success(
        "Verification email has been resent. Please check your inbox."
      );
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex relative flex-row items-center justify-between flex-1 min-h-full px-6 py-12 bg-green-50 lg:px-8">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="sm:mx-auto sm:w-full sm:max-w-sm"
          >
            <h2 className="mt-10 font-raleway text-blue-950 text-2xl font-bold leading-9 tracking-tight text-left">
              Sign Up
            </h2>
          </motion.div>
          {present ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                ease: "easeOut",
                duration: 0.5,
              }}
              className={`mt-5 h-20 items-center justify-center flex `}
            >
              <div className="px-5 rounded-md w-[24rem] bg-red-50 py-7 lg:px-3 ring-2 ring-red-700">
                <p className="font-bold text-red-600">{error}</p>
              </div>
            </motion.div>
          ) : (
            ""
          )}

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 md:text-md dark:text-gray-400"
                >
                  Email address
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
                    id="email"
                    name="email"
                    onChange={handleChange}
                    type="email"
                    required
                    autoComplete="email"
                    className="block px-1 w-full py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900 md:text-md dark:text-gray-400"
                  >
                    Password
                  </label>
                </div>
                <div className="relative mt-2">
                  <motion.input
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    whileFocus={{
                      width: [0, "100%"],
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    id="password"
                    name="password"
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    className="block px-1 w-full py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <BsEye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password2"
                    className="block text-sm font-medium leading-6 text-gray-900 md:text-md dark:text-gray-400"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="relative mt-2">
                  <motion.input
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    whileFocus={{
                      width: [0, "100%"],
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    id="password2"
                    name="password2"
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    className="block px-1 w-full py-2 text-gray-900 border-b-2 border-green-600 outline-none bg-inherit placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <BsEye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", ease: "easeOut" }}
                  className={`flex w-full  justify-center rounded-md ${
                    loading
                      ? "bg-gray-200 cursor-not-allowed "
                      : "bg-green-600 hover:bg-green-700"
                  }  px-3 py-1 text-sm cursor-pointer font-semibold leading-6 text-white focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center cursor-not-allowed">
                      <Spinner
                        color="#2C3930"
                        size={20}
                        speed={2}
                        animating={true}
                      />
                    </div>
                  ) : (
                    <span className="relative z-10">Sign Up</span>
                  )}
                </motion.button>
              </motion.div>
            </form>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-start justify-start w-full"
            >
              <p className="mt-5 text-sm font-bold text-center text-black dark:text-gray-300">
                Already have an account?
                <Link href={"/"}>
                  <button className="ml-2 cursor-pointer font-semibold leading-6 text-gray-400 hover:text-blue-500">
                    Login
                  </button>
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
        {/* image and quote section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full hidden md:flex md:flex-col"
        >
          <Image
            alt="herveg logo"
            src={logo}
            className="w-auto h-auto opacity-95 mx-auto"
          />
          <div className="relative max-w-xl p-6 mx-auto">
            <BsQuote
              className="absolute text-orange-600 top-2 left-2"
              size={48}
              strokeWidth={1.5}
            />
            <div className="pl-12">
              <h2 className="mb-3 text-lg xl:text-xl italic text-gray-800 ">
                {quotes[val]?.quote}
              </h2>
              <p className="font-semibold text-right text-gray-600 text-md">
                — {quotes[val]?.author}
              </p>
            </div>
          </div>
        </motion.div>

        {/* notification overlay */}
        {showNotification && (
          <div className="absolute top-0 right-0 left-0 flex flex-col min-h-screen items-center justify-center bottom-0 bg-white/50 backdrop-blur-lg">
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className=" relative w-full max-w-md p-8 mx-4 bg-white rounded-lg shadow-2xl "
            >
              <div className="flex flex-col items-center text-center">
                <MotionCheckCircle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-20 h-20 mb-4 text-green-500"
                />
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-2 text-2xl font-raleway font-bold text-gray-800"
                >
                  Success!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6 text-gray-600"
                >
                  Your account has been created successfully.
                </motion.p>
                <div className="w-full mb-6 space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Mail className="text-gray-500" />

                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Email:
                      </span>
                    </div>
                    <span className="text-gray-800">{userData?.email}</span>
                  </div>
                </div>
                <p className="mb-4 text-sm text-gray-600">
                  Please check your email for the verification link. If you
                  didnt receive it, you can request a new one.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleClick(userData?.email)}
                  className="flex items-center justify-center px-6 py-2 space-x-2 font-medium text-white transition-colors duration-300 bg-blue-500 rounded-full hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <FiRefreshCw className="animate-spin" />
                  ) : (
                    <>
                      <div className="flex flex-row items-center gap-x-2">
                        <Mail className="w-4 h-4" />
                        <span>Resend Verification</span>
                      </div>
                    </>
                  )}
                </motion.button>
              </div>
              <div className="absolute top-2 right-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className="p-2 text-gray-400 cursor-pointer rounded-full hover:bg-gray-200"
                >
                  <XCircle className="text-4xl " />
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}
