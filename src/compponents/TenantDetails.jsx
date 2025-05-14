"use client";

import { useState } from "react";
import {
  User,
  Phone,
  Calendar,
  CreditCard,
  Home,
  Users,
  Mail,
} from "lucide-react";

// This would typically come from props or a context/state management
// const [tenant, setTenant] = useState({
//   id: "a5b5dda9-e37e-4ae8-931a-b4476e66e25f",
//   full_name: "Zuberi Mhando",
//   gender: "male",
//   role: "tenant",
//   phone_number: "0786722646",
//   created_at: "2025-04-27T12:20:32.13014+00:00",
//   national_id: null,
//   lords_id: "6bf4c3b0-7f9f-4137-b1a8-293e4111df96",
//   room_id: null,
//   house_id: "9c5ba1ac-24ac-4cb8-b517-58e10eebdd11",
// });

export default function TenantDetails({ tenant }) {
  // Format date for better readability
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle missing data
  const displayValue = (value) => value || "Not provided";

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mb-3">
        <h2 className=" font-bold text-gray-800">Tenant Details</h2>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
          {tenant?.role}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="  font-semibold text-gray-700 border-b pb-2">
            Personal Information
          </h3>

          <div className="flex items-center space-x-3">
            <User className="text-gray-500 w-5 h-5" />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{tenant?.full_name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Users className="text-gray-500 w-5 h-5" />
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium capitalize">{tenant?.gender}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="text-gray-500 w-5 h-5" />
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">{tenant?.phone_number}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <CreditCard className="text-gray-500 w-5 h-5" />
            <div>
              <p className="text-sm text-gray-500">National ID</p>
              <p className="font-medium">{displayValue(tenant?.national_id)}</p>
            </div>
          </div>
        </div>

        {/* Property Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">
            Property Information
          </h3>

          <div className="flex items-center space-x-3">
            <Home className="text-gray-500 w-5 h-5" />
            <div>
              <p className="text-sm text-gray-500">House ID</p>
              <p className="font-medium truncate max-w-xs">
                {tenant?.house_id}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="text-gray-500 w-5 h-5" />
            <div>
              <p className="text-sm text-gray-500">Room Number</p>
              <p className="font-medium">{displayValue(tenant?.room_id)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Users className="text-gray-500 w-5 h-5" />
            <div>
              <p className="text-sm text-gray-500">Landlord ID</p>
              <p className="font-medium truncate max-w-xs">
                {tenant?.lords_id}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="text-gray-500 w-5 h-5" />
            <div>
              <p className="text-sm text-gray-500">Tenant Since</p>
              <p className="font-medium">{formatDate(tenant?.created_at)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t">
        <p className="text-xs text-gray-500">Tenant ID: {tenant?.id}</p>
      </div>
    </div>
  );
}
