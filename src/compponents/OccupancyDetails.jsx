"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Home,
  User,
  DollarSign,
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

export default function OccupancyDetails({
  occupancyData,
  setShowEdit,
  showEdit,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format date to display in a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function to format the created_at timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Check if end_date month is the current month
  const isEndDateInCurrentMonth = () => {
    const today = new Date();
    const endDate = new Date(occupancyData.end_date);

    return (
      today.getMonth() === endDate.getMonth() &&
      today.getFullYear() === endDate.getFullYear()
    );
  };

  // Check if we should show the reminder

  const showEndDateReminder = isEndDateInCurrentMonth();

  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-3">
        <h2 className=" font-bold text-sm md:text-base text-gray-800">
          Occupancy Details
        </h2>
        <div
          className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
            occupancyData.is_active
              ? "bg-green-300 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {occupancyData.is_active ? "Occupied" : "Not Occupied"}
        </div>
      </div>

      {/* End Date Reminder */}
      {showEndDateReminder && (
        <div className="mb-4 bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm text-amber-800">
              Rent Ending This Month
            </p>
            <p className="text-amber-700 text-xs md:text-sm">
              This contract agreement will end on{" "}
              {formatDate(occupancyData.end_date)}. Please arrange for Rent
              renewal or move-out procedures.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tenancy Period */}
        <div
          className={` p-4 rounded-lg ${
            showEndDateReminder ? "bg-red-100" : "bg-gray-50"
          }`}
        >
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="font-semibold text-sm text-gray-700">
              Contract Period
            </h3>
          </div>
          <div className="ml-7 text-xs md:text-sm">
            <p className="text-gray-700">
              <span className="font-medium">Start Date:</span>{" "}
              {formatDate(occupancyData.start_date)}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Duration:</span>{" "}
              {occupancyData.duration_in_months} months
            </p>
            <p className="text-gray-700">
              <span className="font-medium">End Date:</span>{" "}
              {formatDate(occupancyData.end_date)}
            </p>
          </div>
        </div>

        {/* Payment Details */}
        <div
          className={` p-4 rounded-lg ${
            showEndDateReminder ? "bg-red-100" : "bg-gray-50"
          }`}
        >
          <div className="flex items-center mb-2">
            <DollarSign className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="text-sm  font-semibold text-gray-700">
              Payment Details
            </h3>
          </div>
          <div className="ml-7 text-xs md:text-sm">
            <p className="text-gray-700">
              <span className="font-medium">Next Rent Due:</span>{" "}
              {formatDate(occupancyData.rent_due_date)}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Status:</span>{" "}
              {showEndDateReminder ? (
                <span className="text-red-600 flex items-center mt-1">
                  <XCircle className="h-4 w-4 mr-1" /> Rent Payment Required
                </span>
              ) : (
                <span className="text-green-600 flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 mr-1" /> Payments up to date
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Toggle for additional details */}
      <div className="w-full text-xs md:text-sm  mt-6 flex flex-row items-center justify-between">
        <button
          className=" text-blue-600 font-medium flex cursor-pointer items-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide" : "Show"} additional details
          <svg
            className={`ml-1 h-4 w-4 transform transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
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
        </button>

        {/* show edit button */}
        <button
          onClick={handleShowEdit}
          className="cursor-pointer text-blue-600 hover:text-red-600 "
        >
          Edit Occupancy form
        </button>
      </div>

      {/* Additional details section */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 flex items-center">
                <User className="h-4 w-4 text-gray-500 mr-2" />
                <span className="font-medium">Tenant ID:</span>
                <span className="ml-2 text-sm font-mono bg-gray-100 px-2 py-0.5 rounded">
                  {occupancyData.tenant_id}
                </span>
              </p>

              <p className="text-gray-700 flex items-center mt-2">
                <Home className="h-4 w-4 text-gray-500 mr-2" />
                <span className="font-medium">House ID:</span>
                <span className="ml-2 text-sm font-mono bg-gray-100 px-2 py-0.5 rounded">
                  {occupancyData.house_id}
                </span>
              </p>

              {occupancyData.room_id && (
                <p className="text-gray-700 flex items-center mt-2">
                  <Home className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="font-medium">Room ID:</span>
                  <span className="ml-2 text-sm font-mono bg-gray-100 px-2 py-0.5 rounded">
                    {occupancyData.room_id}
                  </span>
                </p>
              )}
            </div>

            <div>
              <p className="text-gray-700 flex items-center">
                <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
                <span className="font-medium">Created At:</span>
                <span className="ml-2">
                  {formatTimestamp(occupancyData.created_at)}
                </span>
              </p>

              <p className="text-gray-700 flex items-center mt-2">
                <Clock className="h-4 w-4 text-gray-500 mr-2" />
                <span className="font-medium">Occupancy ID:</span>
                <span className="ml-2 text-xs font-mono bg-gray-100 px-2 py-0.5 rounded break-all">
                  {occupancyData.id}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
