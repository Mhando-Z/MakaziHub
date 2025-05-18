"use client";

// icons
import { FaMoneyBillTrendUp, FaPowerOff } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { IoKeySharp, IoPeople } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { RiLuggageDepositFill } from "react-icons/ri";
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

// what vano and other supervisors can see
const userRoutes = [
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

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [show, setshow] = useState(false);
  const { user, userData, setUser } = useContext(UserContext);
  const { setUserdata } = useContext(UserContext);

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
  };

  // button functons
  const handleShow = () => {
    if (show === true) {
      setshow(!show);
    }
    setshow(!show);
  };
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      LogOutUser();
      setUser(null);
      setUserdata(null);
      router.push("/");
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

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 bg-slate-100  h-full transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex flex-col justify-between min-h-screen p-6">
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
              <div className="flex flex-col w-full">
                {userRoutes?.map((dt, index) => {
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
                                ? "bg-green-600 items-center gap-x-5 text-center font-medium  text-gray-50 w-full flex flex-row py-2 px-7 mt-2 rounded"
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
      <div className="flex-1 ml-0 overflow-y-auto bg-gray-50 md:ml-64">
        <header className="sticky top-0 z-30 flex items-center justify-between py-4 shadow bg-slate-100 md:py-6">
          {/* Button to toggle sidebar on mobile */}
          <button
            className="px-4 text-gray-600 focus:outline-none"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <div className="relative flex flex-col items-center gap-x-2 ">
            {/* profile icon or picture */}
            <div
              className="flex flex-row items-center px-5 cursor-pointer gap-x-3"
              onClick={handleShow}
            >
              <motion.img
                className="object-cover h-8 border-4 border-green-300 rounded-full md:h-10"
                src={`https://ui-avatars.com/api/?name=${user?.email}`}
                alt="User Avatar"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            {show ? (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                  type: "spring",
                }}
                className="absolute top-14  right-0 h-[22rem] w-[270px] rounded-xl bg-slate-100"
              >
                <div className="flex flex-col justify-center py-14 gap-y-4 px-7">
                  <div className="flex flex-col items-center">
                    {/* <ProfileIcon data={userData} /> */}

                    <motion.img
                      className="object-cover border-4 border-green-300 rounded-full h-14"
                      src={`https://ui-avatars.com/api/?name=${user?.email}`}
                      alt="User Avatar"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />

                    <div className="mt-2">
                      {userData?.role === "landlord" ? (
                        <div className="flex flex-row items-center w-full gap-x-1">
                          <>
                            <h1 className="text-sm">landlord</h1>
                          </>
                          <HiMiniCheckBadge className="text-blue-700 gap-x-10" />
                        </div>
                      ) : (
                        <div className="flex flex-row items-center w-full gap-x-1">
                          <>
                            <h1 className="text-sm">tenant</h1>
                          </>
                          <HiMiniCheckBadge className="text-green-700 gap-x-10" />
                        </div>
                      )}
                    </div>

                    <h1 className="text-lg line-clamp-2  items-center text-[#121037] font-medium">
                      {userData?.full_name}
                    </h1>
                    <p className="line-clamp-2  items-center text-[#121037]">
                      {user?.email}
                    </p>
                  </div>
                  <div className="mt-5 border-2 border-slate-300"></div>
                  <Link href={"userprofile"}>
                    <div onClick={() => setshow(!show)}>
                      <div className="flex flex-row items-center cursor-pointer gap-x-4 ">
                        <FaRegUser className="text-xl" />
                        <h1 className=" text-[#121037] font-medium">
                          View Profile
                        </h1>
                      </div>
                    </div>
                  </Link>

                  <div
                    onClick={handleLogout}
                    className="flex flex-row items-center cursor-pointer gap-x-4 "
                  >
                    <FaPowerOff className="text-xl text-red-600" />
                    <h1 className="text-[#121037] font-medium">Log Out</h1>
                  </div>
                </div>
              </motion.div>
            ) : (
              ""
            )}
          </div>
        </header>
        {/* other pages router rendered here */}
        <main className="flex flex-col min-h-screen p-4 md:p-6">
          <main>{children}</main>
        </main>
      </div>
    </div>
  );
}
