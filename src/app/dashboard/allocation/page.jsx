"use client";

import React, { useContext, useState } from "react";
import { supabase2 } from "@/Config/Supabase";
import UserContext from "@/context/UserContext";
import { toast } from "react-toastify";

function Allocation() {
  const { user } = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    lords_id: "",
    house_id: "",
    room_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setMessage({ text: "", type: "" });
    setFormData({
      lords_id: "",
      house_id: "",
      room_id: "",
    });
  };

  const validateForm = () => {
    if (!formData.lords_id.trim()) {
      setMessage({ text: "Lords ID is required", type: "error" });
      return false;
    }

    if (selectedOption === "Rent House" && !formData.house_id.trim()) {
      setMessage({ text: "House ID is required", type: "error" });
      return false;
    }

    if (selectedOption === "Rent Room" && !formData.room_id.trim()) {
      setMessage({ text: "Room ID is required", type: "error" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      let updateData = { lords_id: formData.lords_id };

      if (selectedOption === "Rent House") {
        updateData.house_id = formData.house_id;
      } else if (selectedOption === "Rent Room") {
        updateData.room_id = formData.room_id;
      }

      const { data, error } = await supabase2
        .from("profiles")
        .update(updateData)
        .eq("id", user?.id)
        .select();

      if (error) {
        throw error;
      }

      setMessage({
        text: `${selectedOption} allocation successful!`,
        type: "success",
      });
      toast.success(`${selectedOption} allocation successful!`);

      // Reset form
      setFormData({ lords_id: "", house_id: "", room_id: "" });
      setSelectedOption("");
    } catch (error) {
      const errorMessage =
        error?.message || "An error occurred during allocation";
      setMessage({
        text: errorMessage,
        type: "error",
      });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mt-10 md:mt-0">
      <div className="">
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-6">
          <div className=" mb-8">
            <h1 className="md:text-xl text-md font-bold text-gray-800 mb-2">
              Property Allocation
            </h1>
            <p className="text-gray-600 text-xs md:text-sm">
              Choose your preferred rental option
            </p>
          </div>

          {/* Option Selection Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mb-8">
            <button
              onClick={() => handleOptionSelect("Rent House")}
              className={`group relative p-6 rounded-xl border-2 transition-all duration-300 ${
                selectedOption === "Rent House"
                  ? "border-emerald-500 bg-emerald-50 "
                  : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
              }`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    selectedOption === "Rent House"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 text-gray-600 group-hover:bg-emerald-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Rent House</h3>
                <p className="text-sm text-gray-600 text-center">
                  Full house rental with complete privacy
                </p>
              </div>
              {selectedOption === "Rent House" && (
                <div className="absolute top-2 right-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                </div>
              )}
            </button>

            <button
              onClick={() => handleOptionSelect("Rent Room")}
              className={`group relative p-6 rounded-xl border-2 transition-all duration-300 ${
                selectedOption === "Rent Room"
                  ? "border-emerald-500 bg-emerald-50 "
                  : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
              }`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    selectedOption === "Rent Room"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 text-gray-600 group-hover:bg-emerald-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 14v3a2 2 0 002 2h4a2 2 0 002-2v-3m-4-10V4a2 2 0 00-2-2H6a2 2 0 00-2 2v6m4 0H4m16 0h-4m-4-4h4m0 0V4a2 2 0 00-2-2h-4m6 6V4"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Rent Room</h3>
                <p className="text-sm text-gray-600 text-center">
                  Individual room in shared accommodation
                </p>
              </div>
              {selectedOption === "Rent Room" && (
                <div className="absolute top-2 right-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Form Section */}
        {selectedOption && (
          <div className="bg-white rounded-2xl  p-6 md:p-8">
            <h2 className="md:text-lg text-sm font-semibold text-gray-800 mb-6">
              {selectedOption} Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Lords ID Field */}
              <div>
                <label
                  htmlFor="lords_id"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Landlord Key
                </label>
                <input
                  type="text"
                  id="lords_id"
                  name="lords_id"
                  value={formData.lords_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Enter Lords ID"
                  disabled={loading}
                />
              </div>

              {/* House ID Field - Only for Rent House */}
              {selectedOption === "Rent House" && (
                <div>
                  <label
                    htmlFor="house_id"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    House key
                  </label>
                  <input
                    type="text"
                    id="house_id"
                    name="house_id"
                    value={formData.house_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter House ID"
                    disabled={loading}
                  />
                </div>
              )}

              {/* Room ID Field - Only for Rent Room */}
              {selectedOption === "Rent Room" && (
                <div>
                  <label
                    htmlFor="room_id"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Room Key
                  </label>
                  <input
                    type="text"
                    id="room_id"
                    name="room_id"
                    value={formData.room_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter Room ID"
                    disabled={loading}
                  />
                </div>
              )}

              {/* Message Display */}
              {message.text && (
                <div
                  className={`p-4 rounded-lg ${
                    message.type === "success"
                      ? "bg-green-50 border border-green-200 text-green-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  <div className="flex items-center">
                    {message.type === "success" ? (
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {message.text}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex items-end w-full gap-5 justify-end ">
                <button>cancel</button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-1  px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    `Confirm ${selectedOption}`
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Allocation;
