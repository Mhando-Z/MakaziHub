"use client";

import React, { useContext, useEffect, useState } from "react";
import UserContext from "@/context/UserContext";
import DataContext from "@/context/DataContext";
import { Calendar, Users, Bell, Clock, Home, Search, User } from "lucide-react";
import HouseDetailsCard from "../house/HouseDetails";
import RoomDetailsCard from "../house/RoomDetails";

function Tenants() {
  const { profile, userData, houses } = useContext(UserContext);
  const { occupancy, roomData } = useContext(DataContext);

  const tenants = profile?.filter((dt) => dt?.lords_id === userData?.id);
  const Occupancy = occupancy?.filter((dt) => dt?.lords_id === userData?.id);

  // const [filteredTenants, setFilteredTenants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ending");

  function filterAndCombineByEndMonth(rentals, tenants) {
    const currentMonth = new Date().getMonth() + 1;

    return rentals
      .filter((rental) => {
        const endMonth = new Date(rental.end_date).getMonth() + 1;
        return endMonth === currentMonth;
      })
      .map((rental) => {
        const tenant = tenants.find((t) => t.id === rental.tenant_id);
        return {
          ...rental,
          tenant: tenant || null,
        };
      });
  }

  const filteredTenants = filterAndCombineByEndMonth(Occupancy, tenants);
  // useEffect(() => {
  //   if (occupancy && tenants) {
  //     const result = filterAndCombineByEndMonth(occupancy, tenants);
  //     setFilteredTenants(result);
  //   }
  // }, []);

  const filteredAllTenants = tenants?.filter((tenant) =>
    tenant?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get days left until end date
  const getDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // property creation
  const [property, setPropety] = useState([]);
  const [showDetails, setDetails] = useState(false);
  const [propertyId, setPropertyId] = useState("");
  const handleSelect = (dt) => {
    const room = roomData?.find((dat) => dat?.id === dt?.room_id);
    const house = houses?.find((dat) => dat?.id === dt?.house_id);
    setPropertyId(dt?.id);
    setPropety(room || house);
    setDetails(!showDetails);
  };

  return (
    <div className="min-h-screen bg-gray-50 md:p-6">
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Tenant Management
        </h1>
        <p className="text-gray-500">
          Manage and monitor your property tenants
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Users className="text-blue-600" size={26} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Tenants</p>
            <p className="text-2xl font-bold">{tenants?.length || 0}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="bg-orange-100 p-3 rounded-full mr-4">
            <Bell className="text-orange-600" size={26} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Ending This Month</p>
            <p className="text-2xl font-bold">{filteredTenants?.length || 0}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <Home className="text-green-600" size={26} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Properties</p>
            <p className="text-2xl font-bold">{Occupancy?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("ending")}
          className={`py-3 px-6 font-medium flex items-center ${
            activeTab === "ending"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Calendar size={18} className="mr-2" />
          Ending This Month
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`py-3 px-6 font-medium flex items-center ${
            activeTab === "all"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Users size={18} className="mr-2" />
          All Tenants
        </button>
      </div>

      {activeTab === "ending" ? (
        /* Tenants Ending This Month */
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Calendar className="mr-2 text-blue-600" size={20} />
              Tenants with Expiring Contract
            </h2>
          </div>

          <div className="mt-4 space-y-4   overflow-y-auto">
            {filteredTenants?.length > 0 ? (
              filteredTenants.map((dt, index) => {
                const daysLeft = getDaysLeft(dt.end_date);
                return (
                  <div>
                    <div
                      key={index}
                      onClick={() => handleSelect(dt)}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center text-gray-600 mr-4">
                          <User size={26} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {dt.tenant?.full_name || "Unknown Tenant"}
                          </p>
                          <p className="text-sm text-gray-500">
                            Contract ends: {formatDate(dt.end_date)}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center
                      ${
                        daysLeft <= 7
                          ? "bg-red-100 text-red-800"
                          : daysLeft <= 14
                          ? "bg-orange-100 text-orange-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                      >
                        <Clock size={14} className="mr-1" />
                        {daysLeft} days left
                      </div>
                    </div>

                    {/* House and Room Details section */}
                    <div>
                      {showDetails &&
                      propertyId === dt?.id &&
                      property?.id === dt?.house_id ? (
                        <HouseDetailsCard house={property} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      {showDetails &&
                      propertyId === dt?.id &&
                      property?.id === dt?.room_id ? (
                        <RoomDetailsCard room={property} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-400 text-lg">
                  No tenants have leases ending this month.
                </p>
                <p className="text-gray-400 text-sm">
                  All your current leases extend beyond this month.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* All Tenants Section */
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Users className="mr-2 text-blue-600" size={20} />
              All Tenants
            </h2>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search tenants..."
                className="py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={16}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tenant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAllTenants?.length > 0 ? (
                  filteredAllTenants.map((tenant, index) => {
                    // Find corresponding occupancy record
                    const rental = occupancy?.find(
                      (r) => r.tenant_id === tenant.id
                    );
                    const status = rental
                      ? new Date(rental.end_date) > new Date()
                        ? "Active"
                        : "Expired"
                      : "Unknown";

                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center text-gray-600">
                              <User size={16} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {tenant.full_name || "Unknown"}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {tenant.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {tenant.email || "No email"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {tenant.phone_number || "No phone"}
                          </div>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {rental?.property_name || "Not assigned"}
                          </div>
                          {rental && (
                            <div className="text-sm text-gray-500">
                              Until: {formatDate(rental.end_date)}
                            </div>
                          )}
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              status === "Active"
                                ? "bg-green-100 text-green-800"
                                : status === "Expired"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No tenants found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tenants;
