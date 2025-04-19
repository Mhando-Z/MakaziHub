"use client";

import logo from "../../public/Assets/Logo/House.png";
import { useState } from "react";
import { motion } from "framer-motion";
import { Dots } from "react-activity";
import Image from "next/image";
import { FiEyeOff } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { useRouter } from "next/navigation";
import PasswordReset from "@/compponents/PassWordReset";
// import { jwtDecode } from "jwt-decode";

export default function UserLogin() {
  const [present, setPresent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);
  const route = useRouter();

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
  // const loging = async () => {
  //   setLoading(true);
  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email: Login.email,
  //     password: Login.password,
  //   });

  //   if (error) {
  //     setError(error.message);
  //     setPresent(true);
  //   } else {
  //     // savetoken to local storage if needed
  //     const { session } = data;
  //     //savetoken to local storage
  //     localStorage.setItem("token", session.access_token);
  //     // const token = localStorage.getItem("token");
  //     // const user = jwtDecode(token);
  //     route.push("dashboard/home");
  //     setPresent(false);
  //   }
  //   setLoading(false);
  // };

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
  };

  // handles simple input validation
  const handleLogin = () => {
    if (Login.email.length !== 0 && Login.password.length !== 0) {
      setPresent(false);
      // loging();
    }
  };

  return (
    <>
      {show ? (
        <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 bg-green-50 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              alt="herveg logo"
              src={logo}
              className="w-auto h-24 mx-auto"
            />
            <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-green-800">
              Sign in to your account
            </h2>
          </div>
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
          ) : loading ? (
            <div className="flex items-center justify-center h-20 mt-5">
              <Dots color="green" size={35} speed={0.7} animating={true} />
            </div>
          ) : (
            ""
          )}

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    onChange={handleChange}
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full focus:bg-blue-50 rounded-md border-0 py-2 px-3 scroll-px-3.5 outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <div
                      onClick={HandleShow}
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </div>
                  </div>
                </div>
                <div className="relative mt-2">
                  <input
                    id="password"
                    onChange={handleChange}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    className="block w-full focus:bg-blue-50 rounded-md border-0 py-2 px-3 scroll-px-3.5 outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <BsEye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", ease: "easeOut" }}
                  onClick={handleLogin}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <PasswordReset HandleShow={HandleShow} />
        </>
      )}
    </>
  );
}
