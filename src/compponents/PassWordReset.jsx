"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../../public/Assets/Logo/House.png";
import { toast } from "react-toastify";

const PasswordReset = ({ HandleShow }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handlePasswordReset = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   const { error } = await supabase.auth.resetPasswordForEmail(email);

  //   if (error) {
  //     setMessage(`Error: ${error.message}`);
  //     toast.error(`Error: ${error.message}`);
  //   } else {
  //     toast.success("Password reset link has been sent to your email.");
  //     setMessage("Password reset link has been sent to your email.");
  //   }
  //   setIsSubmitting(false);
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md"
      >
        <img alt="herveg logo" src={logo} className="w-auto h-24 mx-auto" />

        <h2 className="text-2xl font-bold text-center">Reset Your Password</h2>

        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-2 mb-4 font-bold text-white bg-green-600 rounded-md hover:bg-green-500 disabled:bg-gray-400"
          >
            {isSubmitting ? "Sending..." : "Send Password Reset Link"}
          </motion.button>
        </form>
        <div className="mt-20">
          <div
            className="w-full py-5 mt-4 text-base text-center text-blue-700"
            onClick={HandleShow}
          >
            Log-in
          </div>
        </div>

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
