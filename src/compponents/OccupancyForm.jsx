"use client";

import { supabase2 } from "@/Config/Supabase";
import { Loader } from "lucide-react";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import DataContext from "@/context/DataContext";
import UserContext from "@/context/UserContext";
import { toast } from "react-toastify";

export default function OccupancyForm({
  house,
  occupancy,
  setShowEdit,
  showEdit,
}) {
  const { fetchOccupancy } = useContext(DataContext);
  const { userData } = useContext(UserContext);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    tenant_id: occupancy?.tenant_id || house?.tenant_id,
    start_date: occupancy?.start_date || "",
    duration_in_months: occupancy?.duration_in_months || "",
    end_date: occupancy?.end_date || "",
    rent_due_date: occupancy?.rent_due_date || "",
    is_active: occupancy?.is_active || false,
    house_id: occupancy?.house_id || house?.id,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.tenant_id) newErrors.tenant_id = "Tenant ID is required";
    if (!formData.start_date) newErrors.start_date = "Start date is required";
    if (!formData.duration_in_months) {
      newErrors.duration_in_months = "Duration is required";
    } else if (
      isNaN(formData.duration_in_months) ||
      formData.duration_in_months < 1
    ) {
      newErrors.duration_in_months = "Duration must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });
    if (validateForm()) {
      if (occupancy) {
        // Update existing occupancy
        const { data, error } = await supabase2
          .from("occupancy")
          .update({
            tenant_id: formData.tenant_id,
            start_date: formData.start_date,
            duration_in_months: formData.duration_in_months,
            end_date: formData.end_date,
            rent_due_date: formData.rent_due_date,
            is_active: formData.is_active,
            house_id: formData.house_id,
            lords_id: userData?.id,
          })
          .eq("id", occupancy?.id)
          .select();
        if (error) {
          setLoading(false);
          setMessage({
            text:
              error?.response?.data?.message ||
              error?.message ||
              "An error occurred",
            type: "error",
          });
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "An error occurred"
          );
        } else {
          fetchOccupancy();
          setLoading(false);
          setMessage({
            text: "House data updated successfully!",
            type: "success",
          });
          toast.success("House data updated successfully!");
        }
      } else {
        // Insert new occupancy
        const { data, error } = await supabase2
          .from("occupancy")
          .insert([
            {
              room_id: null,
              lords_id: userData?.id,
              tenant_id: formData.tenant_id || null,
              start_date: formData.start_date || "",
              duration_in_months: formData.duration_in_months || "",
              end_date: formData.end_date || "",
              rent_due_date: formData.rent_due_date || "",
              is_active: formData.is_active || false,
              house_id: formData.house_id || null,
            },
          ])
          .select();
        if (error) {
          setLoading(false);
          setMessage({
            text:
              error?.response?.data?.message ||
              error?.message ||
              "An error occurred",
            type: "error",
          });
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "An error occurred"
          );
        } else {
          fetchOccupancy();
          setLoading(false);
          setMessage({
            text: "House data saved successfully!",
            type: "success",
          });
          toast.success("House data Created successfully!");
        }
      }
    } else setLoading(false);
  };

  return (
    <div className="mx-auto bg-white">
      <h2 className="font-bold mb-3 text-sm md:text-base text-gray-800">
        Occupancy Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tenant ID Field */}
          <div className="space-y-1">
            <label
              htmlFor="tenant_id"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              Tenant ID
            </label>
            <input
              type="text"
              id="tenant_id"
              name="tenant_id"
              value={formData.tenant_id}
              onChange={handleChange}
              className={`w-full p-2 text-xs md:text-sm border rounded-md outline-0 ${
                errors.tenant_id ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.tenant_id && (
              <p className="text-red-500 text-xs">{errors.tenant_id}</p>
            )}
          </div>

          {/* House ID Field */}
          <div className="space-y-1">
            <label
              htmlFor="house_id"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              House ID
            </label>
            <input
              type="text"
              id="house_id"
              name="house_id"
              value={formData.house_id}
              onChange={handleChange}
              className={`w-full p-2 text-xs md:text-sm border rounded-md outline-0 ${
                errors.house_id ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.house_id && (
              <p className="text-red-500 text-xs">{errors.house_id}</p>
            )}
          </div>

          {/* Start Date Field */}
          <div className="space-y-1">
            <label
              htmlFor="start_date"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className={`w-full p-2 text-xs md:text-sm border rounded-md outline-0 ${
                errors.start_date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.start_date && (
              <p className="text-red-500 text-xs">{errors.start_date}</p>
            )}
          </div>

          {/* Duration in Months Field */}
          <div className="space-y-1">
            <label
              htmlFor="duration_in_months"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              Duration (months)
            </label>
            <input
              type="number"
              id="duration_in_months"
              name="duration_in_months"
              min="1"
              value={formData.duration_in_months}
              onChange={handleChange}
              className={`w-full p-2 text-xs md:text-sm border rounded-md outline-0 ${
                errors.duration_in_months ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.duration_in_months && (
              <p className="text-red-500 text-xs">
                {errors.duration_in_months}
              </p>
            )}
          </div>

          {/* End Date Field */}
          <div className="space-y-1">
            <label
              htmlFor="end_date"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full p-2 text-xs md:text-sm border border-gray-300 rounded-md"
              placeholder="Calculated from start date + duration"
            />
            <p className="text-xs text-gray-500">
              Optional (auto-calculated if left blank)
            </p>
          </div>

          {/* Rent Due Date Field */}
          <div className="space-y-1">
            <label
              htmlFor="rent_due_date"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              Rent Due Date
            </label>
            <input
              type="date"
              id="rent_due_date"
              name="rent_due_date"
              value={formData.rent_due_date}
              onChange={handleChange}
              className="w-full p-2 text-xs md:text-sm border border-gray-300 rounded-md"
            />
            <p className="text-xs text-gray-500">Date when rent is due</p>
          </div>

          {/* Is Active Field */}
          <div className="space-y-1 col-span-1 flex items-center">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="is_active"
              className="ml-2 block text-xs md:text-sm font-medium text-gray-700"
            >
              Is Active
            </label>
          </div>
        </div>

        {/* notification section */}
        {message.text && (
          <div
            className={`mb-4 text-xs md:text-sm p-3 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex flex-row justify-end gap-4 pt-4">
          {showEdit ? (
            <button
              type="button"
              className="px-4 py-1 cursor-pointer hover:bg-red-600 hover:text-white bg-gray-100 text-gray-700 rounded-md text-xs md:text-sm"
              onClick={() => setShowEdit(!showEdit)}
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              className="px-4 py-1 cursor-pointer hover:bg-red-600 hover:text-white bg-gray-100 text-gray-700 rounded-md text-xs md:text-sm"
              onClick={() =>
                setFormData({
                  room_id: "",
                  tenant_id: "",
                  start_date: "",
                  duration_in_months: "",
                  end_date: "",
                  rent_due_date: "",
                  is_active: false,
                  house_id: "",
                })
              }
            >
              Reset
            </button>
          )}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", ease: "easeOut" }}
            className={`flex text-xs md:text-sm  justify-center rounded-md ${
              loading
                ? "bg-gray-200 cursor-not-allowed "
                : "bg-blue-600 hover:bg-blue-700"
            }  px-3 py-1 text-sm cursor-pointer font-semibold leading-6 text-white focus-visible:outline-offset-2 `}
          >
            {loading ? (
              <div className="flex items-center justify-center cursor-not-allowed">
                <Loader className="animate-spin text-2xl text-green-600 [animation-duration:0.6s]" />
              </div>
            ) : (
              <span className=""> {occupancy ? "Update" : "Submit"}</span>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
