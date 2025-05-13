"use client";

import { useState } from "react";

export default function OccupancyForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    room_id: initialData.room_id || "",
    tenant_id: initialData.tenant_id || "",
    start_date: initialData.start_date || "",
    duration_in_months: initialData.duration_in_months || "",
    end_date: initialData.end_date || "",
    rent_due_date: initialData.rent_due_date || "",
    is_active: initialData.is_active || false,
    house_id: initialData.house_id || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.room_id) newErrors.room_id = "Room ID is required";
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
    if (!formData.house_id) newErrors.house_id = "House ID is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Occupancy Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Room ID Field */}
          <div className="space-y-1">
            <label
              htmlFor="room_id"
              className="block text-sm font-medium text-gray-700"
            >
              Room ID
            </label>
            <input
              type="text"
              id="room_id"
              name="room_id"
              value={formData.room_id}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${
                errors.room_id ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.room_id && (
              <p className="text-red-500 text-xs">{errors.room_id}</p>
            )}
          </div>

          {/* Tenant ID Field */}
          <div className="space-y-1">
            <label
              htmlFor="tenant_id"
              className="block text-sm font-medium text-gray-700"
            >
              Tenant ID
            </label>
            <input
              type="text"
              id="tenant_id"
              name="tenant_id"
              value={formData.tenant_id}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${
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
              className="block text-sm font-medium text-gray-700"
            >
              House ID
            </label>
            <input
              type="text"
              id="house_id"
              name="house_id"
              value={formData.house_id}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${
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
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${
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
              className="block text-sm font-medium text-gray-700"
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
              className={`w-full p-2 border rounded-md ${
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
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
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
              className="block text-sm font-medium text-gray-700"
            >
              Rent Due Date
            </label>
            <input
              type="date"
              id="rent_due_date"
              name="rent_due_date"
              value={formData.rent_due_date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
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
              className="ml-2 block text-sm font-medium text-gray-700"
            >
              Is Active
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
