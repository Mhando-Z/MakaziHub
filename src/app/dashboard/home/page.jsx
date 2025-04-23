"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  DollarSign,
  AlertCircle,
  PieChart,
  BarChart2,
} from "lucide-react";

// Mock data - in a real app this would come from your API
const mockData = {
  totalHouses: 3,
  totalRooms: 15,
  occupiedRooms: 10,
  vacantRooms: 5,
  totalTenants: 10,
  totalRentCollected: 1000000,
  pendingPayments: 2,
  upcomingRentDue: 3,
  recentActivities: [
    {
      id: 1,
      type: "move-in",
      tenant: "John Doe",
      house: "House A",
      date: "2025-04-20",
    },
    {
      id: 2,
      type: "payment",
      tenant: "Jane Smith",
      house: "House B",
      amount: 300000,
      date: "2025-04-18",
    },
    {
      id: 3,
      type: "move-out",
      tenant: "Mike Johnson",
      house: "House C",
      date: "2025-04-15",
    },
  ],
  monthlyRentData: [
    { month: "Jan", amount: 800000 },
    { month: "Feb", amount: 900000 },
    { month: "Mar", amount: 950000 },
    { month: "Apr", amount: 1000000 },
  ],
};

// Dashboard Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-md p-4 ${color}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div
          className={`p-2 rounded-full ${
            color === "border-l-green-500"
              ? "bg-green-100"
              : color === "border-l-red-500"
              ? "bg-red-100"
              : color === "border-l-blue-500"
              ? "bg-blue-100"
              : color === "border-l-yellow-500"
              ? "bg-yellow-100"
              : "bg-gray-100"
          }`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

// Recent Activity Component
const RecentActivity = ({ activity }) => {
  const getActivityDetails = (activity) => {
    switch (activity.type) {
      case "move-in":
        return {
          title: `${activity.tenant} moved in`,
          description: `to ${activity.house} on ${activity.date}`,
          color: "bg-green-100 text-green-800",
        };
      case "move-out":
        return {
          title: `${activity.tenant} moved out`,
          description: `from ${activity.house} on ${activity.date}`,
          color: "bg-red-100 text-red-800",
        };
      case "payment":
        return {
          title: `${activity.tenant} paid rent`,
          description: `TZS ${activity.amount.toLocaleString()} for ${
            activity.house
          }`,
          color: "bg-blue-100 text-blue-800",
        };
      default:
        return {
          title: "Activity",
          description: "Unknown activity",
          color: "bg-gray-100 text-gray-800",
        };
    }
  };

  const details = getActivityDetails(activity);

  return (
    <motion.div
      className="flex items-center gap-3 mb-3"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`w-2 h-2 rounded-full ${details.color.split(" ")[0]}`}
      ></div>
      <div>
        <h4 className="font-medium">{details.title}</h4>
        <p className="text-sm text-gray-500">{details.description}</p>
      </div>
    </motion.div>
  );
};

// Chart Components
const RoomOccupancyChart = ({ occupied, vacant }) => {
  return (
    <div className="relative h-40 w-40 mx-auto">
      <PieChart className="w-full h-full text-gray-300" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-sm font-medium">Room Occupancy</p>
        <p className="text-lg font-bold text-green-500">
          {occupied} / {occupied + vacant}
        </p>
      </div>
    </div>
  );
};

const MonthlyRentChart = ({ data }) => {
  return (
    <div className="h-40 w-full flex items-end justify-between gap-2 mt-4">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <motion.div
            className="w-8 bg-blue-500 rounded-t"
            initial={{ height: 0 }}
            animate={{ height: `${(item.amount / 1000000) * 100}px` }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          ></motion.div>
          <p className="text-xs mt-1">{item.month}</p>
        </div>
      ))}
    </div>
  );
};

// Main Dashboard Component
export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setData(mockData);
    }, 500);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="">
      <motion.h1
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard
      </motion.h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Houses"
          value={data.totalHouses}
          icon={<Home size={20} className="text-blue-600" />}
          color="border-l-blue-500 border-l-4"
        />
        <StatCard
          title="Total Rooms"
          value={data.totalRooms}
          icon={<Home size={20} className="text-blue-600" />}
          color="border-l-blue-500 border-l-4"
        />
        <StatCard
          title="Occupied Rooms"
          value={data.occupiedRooms}
          icon={<Users size={20} className="text-green-600" />}
          color="border-l-green-500 border-l-4"
        />
        <StatCard
          title="Vacant Rooms"
          value={data.vacantRooms}
          icon={<Home size={20} className="text-yellow-600" />}
          color="border-l-yellow-500 border-l-4"
        />
        <StatCard
          title="Total Tenants"
          value={data.totalTenants}
          icon={<Users size={20} className="text-blue-600" />}
          color="border-l-blue-500 border-l-4"
        />
        <StatCard
          title="Total Rent Collected"
          value={`TZS ${data.totalRentCollected.toLocaleString()}`}
          icon={<DollarSign size={20} className="text-green-600" />}
          color="border-l-green-500 border-l-4"
        />
        <StatCard
          title="Pending Payments"
          value={`${data.pendingPayments} tenants`}
          icon={<AlertCircle size={20} className="text-red-600" />}
          color="border-l-red-500 border-l-4"
        />
        <StatCard
          title="Upcoming Rent Due"
          value={`${data.upcomingRentDue} in 7 days`}
          icon={<AlertCircle size={20} className="text-yellow-600" />}
          color="border-l-yellow-500 border-l-4"
        />
      </div>

      {/* Second Row: Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-lg shadow-md p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-4">
            Rent Collection & Occupancy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <h3 className="text-md font-medium mb-2">Room Occupancy</h3>
              <RoomOccupancyChart
                occupied={data.occupiedRooms}
                vacant={data.vacantRooms}
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-md font-medium mb-2">
                Monthly Rent Collection
              </h3>
              <MonthlyRentChart data={data.monthlyRentData} />
            </div>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="mt-4">
            {data.recentActivities.map((activity) => (
              <RecentActivity key={activity.id} activity={activity} />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <h3 className="text-md font-medium mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home size={16} />
                <span>Add House</span>
              </motion.button>
              <motion.button
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users size={16} />
                <span>Add Tenant</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
