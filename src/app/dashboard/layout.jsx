"use client";

// icons
import { FaMoneyBillTrendUp, FaPowerOff } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { IoKeySharp, IoPeople } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { HiMiniCheckBadge } from "react-icons/hi2";
import Image from "next/image";
// other imports
import logo from "../../../public/Assets/Logo/House.png";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ProfilePictures from "@/compponents/ProfilePicture";
import { supabase2 } from "@/Config/Supabase";
import UserContext from "@/context/UserContext";
import { toast } from "react-toastify";
import { IoMdMenu } from "react-icons/io";
import { BiSolidDirections } from "react-icons/bi";
import DataContext from "@/context/DataContext";
//
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";

// what vano and other supervisors can see
const LordsRoutes = [
  {
    sections: "Home",
    path: "/dashboard/home",
    links: "home",
    icon: <FaHome />,
  },
  {
    sections: "Tenants",
    path: "/dashboard/tenants",
    links: "tenants",
    icon: <IoPeople />,
  },
];
// what vano and other supervisors can see
const TenantRoutes = [
  {
    sections: "Home",
    path: "/dashboard/userhome",
    links: "userhome",
    icon: <FaHome />,
  },
  {
    sections: "Allocation",
    path: "/dashboard/allocation",
    links: "allocation",
    icon: <BiSolidDirections />,
  },
];

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [show, setshow] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { user, userData, setUser } = useContext(UserContext);
  const { setUserdata } = useContext(UserContext);
  const { notification } = useContext(DataContext);

  //pagge navigation
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {}, [user, userData]);

  const LogOutUser = async () => {
    const { error } = await supabase2.auth.signOut();
    if (error) {
      console.error(error.message);
    } else {
      redirect("/");
    }
  };

  // scrolll to top function
  const scrollToTop = () => {
    // Check if the screen width is less than or equal to the tablet breakpoint (e.g., 768px)
    if (window.innerWidth <= 768) {
      toggleSidebar(); // Only toggle sidebar for tablet or mobile views
    }
  };

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    handleDismiss();
  };

  // button functons
  const handleShow = () => {
    if (show === true) {
      setshow(!show);
    }
    setshow(!show);
    setShowNotification(false);
  };

  const handleLogout = () => {
    try {
      // Perform logout logic here
      localStorage.removeItem("token");
      LogOutUser();
      setUser(null);
      setUserdata(null);
      router.push("/logout");
    } catch (error) {
      toast.error("Logout failed:", error);
    }
  };

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      redirect("/");
      return;
    }
  }, []);

  // notification functions
  const handleNotification = () => {
    setShowNotification(!showNotification);
    setshow(false);
  };

  const handleDismiss = () => {
    setShowNotification(false);
    setshow(false);
  };

  return (
    <div className="flex min-h-screen appearance-none md:h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 bg-slate-100  h-full transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div
          onClick={handleDismiss}
          className="flex flex-col justify-between min-h-screen p-6"
        >
          <div>
            <div className="flex flex-col  items-center gap-x-3 justify-center">
              <Image
                src={logo}
                alt="herveg logo"
                className="w-auto h-30 opacity-45 "
              />
              {/* <h1>MakaziHub</h1> */}
            </div>
            <nav className="mt-10">
              {userData?.role === "landlord" ? (
                <div className="flex flex-col w-full">
                  {LordsRoutes?.map((dt, index) => {
                    return (
                      <div key={index + 234} className="flex flex-col gap-y-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.8 }}
                          transition={{ type: "spring", ease: "easeOut" }}
                          className="w-full"
                        >
                          <Link href={dt.links}>
                            <div
                              onClick={scrollToTop}
                              className={`${
                                pathname === dt.path
                                  ? "bg-green-600 items-center gap-x-2 text-center font-medium  text-gray-50 w-full flex flex-row py-2 px-7 mt-2 rounded"
                                  : "flex  flex-row py-2 w-full  gap-x-2 hover:transition-colors items-center hover:ease-out hover:duration-300 hover:bg-gray-200 hover:text-gray-900 hover:font-medium  px-7 mt-2 text-slate-800 rounded"
                              }`}
                            >
                              <p className="text-xl">{dt.icon}</p>
                              <h1 className="text-sm xl:text-base line-clamp-1">
                                {dt.sections}
                              </h1>
                            </div>
                          </Link>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col w-full">
                  {TenantRoutes?.map((dt, index) => {
                    return (
                      <div key={index + 234} className="flex flex-col gap-y-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.8 }}
                          transition={{ type: "spring", ease: "easeOut" }}
                          className="w-full"
                        >
                          <Link href={dt.links}>
                            <div
                              onClick={scrollToTop}
                              className={`${
                                pathname === dt.path
                                  ? "bg-green-600 items-center gap-x-2 text-center font-medium  text-gray-50 w-full flex flex-row py-2 px-7 mt-2 rounded"
                                  : "flex  flex-row py-2 w-full  gap-x-2 hover:transition-colors items-center hover:ease-out hover:duration-300 hover:bg-gray-200 hover:text-gray-900 hover:font-medium  px-7 mt-2 text-slate-800 rounded"
                              }`}
                            >
                              <p className="text-xl">{dt.icon}</p>
                              <h1 className="text-sm xl:text-base line-clamp-1">
                                {dt.sections}
                              </h1>
                            </div>
                          </Link>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              )}
            </nav>
          </div>
          <div>
            {/* userprofile details */}
            <ProfilePictures />
          </div>
        </div>
      </aside>

      {/* Overlay for Sidebar on small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 ml-0 overflow-y-auto   md:ml-64">
        <header className="md:sticky w-full fixed top-0 z-30 flex items-center justify-between px-4 py-2 shadow bg-slate-100 ">
          {/* Button to toggle sidebar on mobile */}
          <button
            className="p-2 text-gray-600 md:invisible rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <IoMdMenu className="text-2xl " />
          </button>

          {/* drop down menu for user profile */}
          <div className="relative flex items-center gap-1 ">
            <div onClick={handleNotification} className="">
              {showNotification ? (
                <IoMdNotifications className="text-2xl md:text-3xl text-green-600 cursor-pointer" />
              ) : (
                <IoIosNotificationsOutline className="text-2xl md:text-3xl cursor-pointer" />
              )}
            </div>

            {/* user profile icon */}
            <div
              className="flex items-center gap-x-2 p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={handleShow}
            >
              <motion.img
                className="h-6 w-6 md:h-8 md:w-8 rounded-full object-cover border-2 border-green-400 shadow-sm"
                src={`https://ui-avatars.com/api/?name=${user?.email}&background=EEF2FF&color=6366F1`}
                alt="User Avatar"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              {/* <span className="hidden md:block text-sm font-medium text-gray-700 truncate max-w-[120px]">
                {userData?.full_name || user?.email?.split("@")[0]}
              </span> */}
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* user profile drop down menue */}
            {show && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 md:top-14 right-0 mt-2 w-64 rounded-lg shadow-lg bg-white overflow-hidden border border-gray-100"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-x-3">
                    <motion.img
                      className="h-12 w-12   rounded-full object-cover border-2 border-green-400"
                      src={`https://ui-avatars.com/api/?name=${user?.email}&background=EEF2FF&color=6366F1`}
                      alt="User Avatar"
                    />
                    <div>
                      <h3 className="md:text-sm text-xs font-semibold text-gray-800 truncate">
                        {userData?.full_name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                      <div className="mt-1 flex items-center">
                        {userData?.role === "landlord" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            <HiMiniCheckBadge className="mr-1" />
                            Landlord
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            <HiMiniCheckBadge className="mr-1" />
                            Tenant
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <Link href="profile">
                    <div
                      onClick={handleDismiss}
                      className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <FaRegUser className="md:w-4 md:h-4 w-3 h-3 text-gray-500" />
                      <span className="ml-3 text-xs md:text-sm font-medium text-gray-700">
                        View Profile
                      </span>
                    </div>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <FaPowerOff className="md:w-4 md:h-4 w-3 h-3 text-red-500" />
                    <span className="ml-3 cursor-pointer text-xs md:text-sm font-medium text-gray-700">
                      Log Out
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* notification dropdown menue */}
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute md:top-14 top-12 right-0 mt-2 w-64 rounded-lg shadow-lg bg-white overflow-hidden border border-gray-100"
              >
                <div className="p-4 border-b border-gray-100">
                  {notification?.length > 0 ? (
                    notification?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-x-3 mb-2"
                      >
                        <div className="rounded-full p-2 ">
                          <MdNotificationsActive className="" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800 truncate">
                            {item?.title}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            {item?.message}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-xs  md:text-sm text-gray-500">
                      No notifications
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </header>

        {/* other pages router rendered here */}
        <main
          onClick={handleDismiss}
          className="flex flex-col min-h-screen p-4 md:p-6"
        >
          <main>{children}</main>
        </main>
      </div>
    </div>
  );
}
