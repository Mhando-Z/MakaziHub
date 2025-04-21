"use client";

import logo from "../../public/Assets/Logo/House.png";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiEyeOff } from "react-icons/fi";
import { BsEye, BsQuote } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DataContext from "@/context/DataContext";
import { supabase2 } from "@/Config/Supabase";
import { Loader } from "lucide-react";
// import { jwtDecode } from "jwt-decode";

export default function UserLogin() {
  const [present, setPresent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);
  const route = useRouter();
  const { quotes } = useContext(DataContext);
  const [val, setVal] = useState(Math.floor(Math.random() * 100) + 1 || 5);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // show password reset page logic
  const HandleShow = () => {
    setShow(!show);
  };

  // takes userinput
  const [Login, setData] = useState({
    email: "",
    password: "",
  });

  // handles user login details submission to database
  const loging = async () => {
    const { data, error } = await supabase2.auth.signInWithPassword({
      email: Login.email,
      password: Login.password,
    });

    if (error) {
      setError(error.message);
      setPresent(true);
    } else {
      // savetoken to local storage if needed
      const { session } = data;
      //savetoken to local storage
      localStorage.setItem("token", session.access_token);
      // const token = localStorage.getItem("token");
      // const user = jwtDecode(token);
      route.push("userprofile");
      setPresent(false);
    }
    setLoading(false);
  };

  // handles userinput
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
    setLoading(true);
    if (Login.email.length !== 0 && Login.password.length !== 0) {
      setPresent(false);
      loging();
    }
  };

  // handles simple input validation
  const handleLogin = () => {
    if (Login.email.length !== 0 && Login.password.length !== 0) {
      setPresent(false);
      loging();
    }
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

  return (
    <>
      <div className="flex flex-row items-center justify-between flex-1 min-h-full px-6 py-12 bg-green-50 lg:px-8">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="sm:mx-auto sm:w-full sm:max-w-sm"
          >
            <Image
              alt="herveg logo"
              src={logo}
              className="w-auto md:hidden h-24 mx-auto"
            />
            <h2 className="mt-10 font-raleway text-blue-950 text-2xl font-bold leading-9 tracking-tight text-left">
              Sign in
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
                  <Link
                    href={"/passwordreset"}
                    className="text-sm font-semibold text-indigo-600 md:text-md hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
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
                      <Loader className="animate-spin text-2xl text-green-600 [animation-duration:0.6s]" />
                    </div>
                  ) : (
                    <span className="relative z-10">Sign In</span>
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
                Not a member
                <Link href={"/register"}>
                  <button className="ml-2 cursor-pointer font-semibold leading-6 text-gray-400 hover:text-blue-500">
                    Register
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
      </div>
    </>
  );
}
