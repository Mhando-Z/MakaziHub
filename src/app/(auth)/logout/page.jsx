"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../../public/Assets/Logo/House.png";
import UserContext from "@/context/UserContext";
import { redirect, usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      redirect("/");
    }, 3000); // wait 3 seconds then fallback

    return () => clearTimeout(timeout);
  }, []);

  // ⏳ Progress bar animation
  useEffect(() => {
    const duration = 2000;
    const interval = 100;
    const steps = duration / interval;
    const increment = 100 / steps;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        return next >= 100 ? 100 : next;
      });
    }, interval);

    return () => clearInterval(progressTimer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={logo}
          alt="MhdLogo"
          className="object-cover md:w-[300px] w-[200px] transition-all"
        />
      </motion.div>

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
        >
          <h1 className="text-xs font-raleway font-bold text-blue-950/60">
            {Math.round(progress)} %
          </h1>
        </motion.div>
      </div>
    </div>
  );
}
