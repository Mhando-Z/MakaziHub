"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../../../../public/Assets/Logo/House.png";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // const { error } = await supabase.auth.resetPasswordForEmail(email);
    // if (error) {
    //   setMessage(`Error: ${error.message}`);
    //   toast.error(`Error: ${error.message}`);
    // } else {
    //   toast.success("Password reset link has been sent to your email.");
    //   setMessage("Password reset link has been sent to your email.");
    // }
    // setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6"
      >
        <Image
          alt="makazihub logo"
          src={logo}
          className="w-auto h-24 mx-auto"
        />

        <h2 className="text-2xl font-raleway text-blue-950 font-medium text-center">
          Reset Your Password
        </h2>

        <form onSubmit={handlePasswordReset} className="space-y-4">
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
                onChange={(e) => setEmail(e.target.value)}
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
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileTap={{ scale: 0.95 }}
              className="w-full px-4 py-1 mb-4 font-bold text-white bg-green-600 rounded-md hover:bg-green-500 disabled:bg-gray-400"
            >
              {isSubmitting ? "Sending..." : "Send Password Reset Link"}
            </motion.button>
          </motion.div>
        </form>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col w-full"
        >
          <Link href={"/"} className="text-base text-right text-blue-700">
            Log-in
          </Link>
        </motion.div>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-sm text-center text-green-500"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default PasswordReset;
