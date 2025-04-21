"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
// import image
import logo from "../../../../public/assets/logo/House.png";
import UserContext from "@/context/UserContext";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const duration = 2000; // total duration (ms)
    const interval = 100; // update every 100ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        return next >= 100 ? 100 : next;
      });
    }, interval);

    const redirectTimer = setTimeout(() => {
      if (userData) {
        redirect("dashboard/home");
      } else {
        redirect("/userprofile");
      }
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(redirectTimer);
    };
  }, [userData]);
  //

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* image section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={logo}
          alt="MhdLogo"
          className="object-cover md:w-[300px] w-[200px]  transition-all"
        />
      </motion.div>
      {/* Progress bar container */}
      <div className="w-full mt-4 justify-center flex items-center gap-x-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-[300px] h-2 bg-gray-200 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-green-400 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className=""
        >
          <h1 className="text-xs font-raleway font-bold text-blue-950/60">
            {progress} %
          </h1>
        </motion.div>
      </div>
    </div>
  );
}
