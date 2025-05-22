"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Plus,
  Edit,
  Trash,
  User,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Loader,
} from "lucide-react";
import UserContext from "@/context/UserContext";
import { supabase2 } from "@/Config/Supabase";
import DataContext from "@/context/DataContext";
import HouseDetailsCard from "./HouseDetails";
import RoomDetailsCard from "./RoomDetails";
import { toast } from "react-toastify";
import HouseWidget from "./HouseWidget";
import { IoWarningOutline } from "react-icons/io5";

// House Form Component
const HouseForm = ({ house = null, onSave, onCancel }) => {
  const { user, gethHouse } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [formData, setFormData] = useState({
    name: house?.name || "",
    region: house?.region || "",
    street: house?.stret || "",
    type: house?.type || "",
    purpose: house?.purpose || "",
    houseprice: house?.house_price || "",
    bedrooms: house?.bedrooms || "",
    bathrooms: house?.bathrooms || "",
    description: house?.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    if (house) {
      // Update existing house
      const { data, error } = await supabase2
        .from("house")
        .update({
          name: formData?.name,
          region: formData?.region,
          street: formData?.street,
          type: formData?.type,
          purpose: formData?.purpose,
          bathrooms: formData?.bathrooms,
          bedrooms: formData?.bedrooms,
          description: formData?.description,
          house_price: formData?.houseprice,
        })
        .eq("id", house?.id)
        .select();

      if (error) {
        setLoading(false);
        setMessage({
          text: error?.response?.data?.message || "An error occurred",
          type: "error",
        });
        toast?.error(error?.response?.data?.message || "An error occurred");
      } else {
        gethHouse();
        setLoading(false);
        setMessage({
          text: "House data updated successfully!",
          type: "success",
        });
        toast.success("House data updated successfully!");
      }
    } else {
      // Insert new house
      const { data, error } = await supabase2
        .from("house")
        .insert([
          {
            user_id: user?.id,
            name: formData?.name || "",
            region: formData?.region || "",
            street: formData?.street || "",
            type: formData?.type || "apartment",
            purpose: formData?.purpose || "",
            bathrooms: formData?.bathrooms || 0,
            bedrooms: formData?.bedrooms || 0,
            description: formData?.description || "",
            house_price: formData?.houseprice || 0,
          },
        ])
        .select();
      if (error) {
        setLoading(false);
        setMessage({
          text: error?.response?.data?.message || "An error occurred",
          type: "error",
        });
        toast?.error(error?.response?.data?.message || "An error occurred");
      } else {
        gethHouse();
        setLoading(false);
        setMessage({
          text: "House data saved successfully!",
          type: "success",
        });
        toast?.success("House data saved successfully!");
      }
    }
  };

  // refresh the form data when the house is updated
  useEffect(() => {
    if (house) {
      setFormData({
        name: house.name,
        region: house.region,
        street: house.street,
        type: house.type,
        purpose: house?.purpose,
      });
    }
  }, [house]);

  return (
    <motion.form
      className="bg-white md:p-6 p-2 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
    >
      <h2 className="md:text-lg text-base font-bold mb-4">
        {house ? <>Edit {house?.name}</> : "Add New House"}
      </h2>

      <div className="mb-4">
        <label
          className="block text-xs   md text-xs md:text-sm mb-2"
          htmlFor="name"
        >
          House Name
        </label>
        <input
          className="shadow text-xs md:text-sm appearance-none border border-gray-300 rounded w-full py-2 px-3  leading-tight outline-0"
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter house name"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs md:text-sm  mb-2" htmlFor="region">
            Region
          </label>
          <input
            className="shadow appearance-none text-xs md:text-sm border border-gray-300 rounded w-full py-2 px-3  leading-tight outline-0"
            id="region"
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            placeholder="Enter region"
            required
          />
        </div>
        <div>
          <label className="block text-xs md:text-sm mb-2" htmlFor="street">
            street
          </label>
          <input
            className="shadow lowercase appearance-none border border-gray-300 rounded w-full py-2 px-3  leading-tight outline-0"
            id="street"
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Enter street"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block  text-xs md:text-sm mb-2" htmlFor="purpose">
          Purpose
        </label>
        <select
          className="shadow appearance-none text-xs md:text-sm border outline-0 border-gray-300 rounded w-full py-2 px-3"
          id="purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          required
        >
          <option value={null}>Select purpose</option>
          <option value="Rent House">Rent House</option>
          <option value="Rent Rooms">Rent Rooms</option>
        </select>
      </div>

      {/* if house is for rent show the following inputs */}
      {formData?.purpose === "Rent House" ? (
        <>
          <div className="mb-4">
            <label
              className="block  text-xs md:text-sm mb-2"
              htmlFor="houseprice"
            >
              House Price
            </label>
            <input
              className="shadow appearance-none text-xs md:text-sm border border-gray-300 rounded w-full py-2 px-3  leading-tight outline-0"
              id="houseprice"
              type="number"
              name="houseprice"
              value={formData.houseprice}
              onChange={handleChange}
              placeholder="Enter number of bed rooms"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block  text-xs md:text-sm mb-2"
              htmlFor="bedrooms"
            >
              BedRooms
            </label>
            <input
              className="shadow appearance-none text-xs md:text-sm border border-gray-300 rounded w-full py-2 px-3  leading-tight outline-0"
              id="bedrooms"
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="Enter number of bedrooms"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block  text-xs md:text-sm mb-2"
              htmlFor="bathrooms"
            >
              BathRooms
            </label>
            <input
              className="shadow appearance-none text-xs md:text-sm border border-gray-300 rounded w-full py-2 px-3  leading-tight outline-0"
              id="bathrooms"
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="Enter number of bathrooms"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block  text-xs md:text-sm mb-2" htmlFor="type">
              House Type
            </label>
            <select
              className="shadow appearance-none text-xs md:text-sm border border-gray-300 rounded w-full py-2 px-3  leading-tight outline-0"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value={null}>Select Type</option>
              <option value="apartment">Apartment</option>
              <option value="bungalow">Bungalow</option>
              <option value="duplex">Duplex</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block  text-xs md:text-sm mb-2"
              htmlFor="description"
            >
              House Description
            </label>
            <textarea
              className="shadow appearance-none text-xs md:text-sm border border-gray-300 rounded w-full py-2 px-3  leading-tight outline-0"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description of the house"
              rows={3}
              required
            />
          </div>
        </>
      ) : (
        <>
          <div className="mb-6">
            <label className="block  text-xs md:text-sm mb-2" htmlFor="type">
              House Type
            </label>
            <select
              className="shadow appearance-none text-xs md:text-sm border border-gray-300 rounded w-full py-2 px-3  leading-tight outline-0"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value={null}>Select Type</option>
              <option value="apartment">Apartment</option>
              <option value="bungalow">Bungalow</option>
              <option value="duplex">Duplex</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>
        </>
      )}

      {/* notification section */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex justify-end gap-2">
        <motion.button
          type="button"
          className="bg-gray-500 text-xs cursor-pointer md:text-sm hover:bg-gray-600 text-white font-bold py-1 px-4 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCancel}
        >
          Cancel
        </motion.button>

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
            <span className="relative z-10"> {house ? "Update" : "Save"}</span>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

// Room Form Component
const RoomForm = ({ room = null, houseId, onSave, onCancel }) => {
  const { fetchRoom } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: room?.room_name || "",
    type: room?.room_type || "",
    rent: room?.rent_price || "",
    status: room?.is_occupied || false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoading(true);
    if (room) {
      // Update existing house
      const { data, error } = await supabase2
        .from("room")
        .update({
          room_name: formData?.name,
          room_type: formData?.type,
          rent_price: formData?.rent,
          is_occupied: formData?.status,
        })
        .eq("id", room?.id)
        .select();

      if (error) {
        setLoading(false);
        toast?.error("fail to update", error?.message);
      } else {
        fetchRoom();
        setLoading(false);
        toast?.success("Updated succesfully!!");
      }
    } else {
      // Insert new house
      const { data, error } = await supabase2
        .from("room")
        .insert([
          {
            house_id: houseId,
            room_name: formData?.name,
            room_type: formData?.type,
            rent_price: formData?.rent,
            is_occupied: formData?.status,
          },
        ])
        .select();
      if (error) {
        setLoading(false);
        toast.error("fail to upload data", error?.message);
      } else {
        fetchRoom();
        setLoading(false);
        toast.success("data uploaded succesfully");
      }
    }
  };

  // refresh the form data when the house is updated
  useEffect(() => {
    if (room) {
      setFormData({
        name: room?.room_name,
        type: room?.room_type,
        rent: room?.rent_price,
        status: room?.is_occupied,
      });
    }
  }, [room]);

  return (
    <motion.form
      className="bg-white md:p-6 p-2 rounded-lg  shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
    >
      <h2 className="md:text-xl text-sm font-bold mb-2 md:mb-4">
        {room ? <>Edit {room.room_name} room</> : "Add New Room"}
      </h2>

      <div className="mb-4">
        <label className="block text-xs md:text-sm mb-2" htmlFor="roomName">
          Room Name/Number
        </label>
        <input
          className="shadow appearance-none text-xs md:text-sm border border-gray-300 rounded w-full py-2 px-3  leading-tight outline-0"
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter room name or number"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs md:text-sm mb-2" htmlFor="roomType">
          Room Type
        </label>
        <select
          className="shadow lowercase text-xs md:text-sm appearance-none border border-gray-300 outline-0 rounded w-full py-2 px-3"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="single">Single</option>
          <option value="master">Master</option>
          <option value="shared">Shared</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-xs md:text-sm mb-2" htmlFor="roomRent">
          Monthly Rent (TZS)
        </label>
        <input
          className="shadow appearance-none text-xs md:text-sm border border-gray-300 rounded w-full py-2 px-3  leading-tight outline-0"
          id="roomRent"
          type="number"
          name="rent"
          value={formData.rent}
          onChange={handleChange}
          placeholder="Enter monthly rent"
          required
        />
      </div>

      <div className="space-y-1 col-span-1 flex items-center">
        <input
          type="checkbox"
          id="status"
          name="status"
          checked={formData.status}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 cursor-pointer border-gray-300 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="status"
          className="ml-2 block text-xs md:text-sm  font-medium text-gray-700"
        >
          Room Occupied .?
        </label>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <motion.button
          type="button"
          className="bg-gray-500 cursor-pointer text-xs md:text-sm hover:bg-gray-600 text-white font-bold py-1 px-4 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCancel}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", ease: "easeOut" }}
          className={`flex text-xs md:text-sm justify-center rounded-md ${
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
            <span className="relative z-10"> {room ? "Update" : "Save"}</span>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

// Room Card Component
const RoomCard = ({
  room,
  onEdit,
  onDelete,
  setRoom,
  setShowRoomDetails,
  showRoomDetails,
  selectedRoom,
}) => {
  const { room_status } = useContext(DataContext);
  const roomStatus = room_status.find((status) => status.room_id === room?.id);
  const [roomSelect, setRoomId] = useState("");

  // select room
  const handleSelect = () => {
    setRoom(room);
    setShowRoomDetails(!showRoomDetails);
    setRoomId(isSelected);
  };
  const isSelected = selectedRoom === room.id;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "TZS",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      className={` ${
        isSelected && showRoomDetails ? "bg-green-200" : "bg-white"
      } rounded-lg shadow p-2 md:p-4 border border-gray-200`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ boxShadow: "0px 4px 15px rgba(0,0,0,0.1)" }}
    >
      <div className="flex justify-between items-start">
        <div
          onClick={handleSelect}
          className="flex cursor-pointer flex-col gap-2"
        >
          <h3 className="font-bold text-sm md:text-lg">{room.room_name}</h3>
          <p className="md:text-sm text-xs ">{room.room_type} Room</p>
        </div>

        <div className="flex gap-1">
          <motion.button
            className="p-1 text-blue-600 cursor-pointer hover:text-blue-800"
            whileHover={{ scale: 1.1 }}
            onClick={() => onEdit(room)}
          >
            <Edit size={16} />
          </motion.button>
          <motion.button
            className="p-1 text-red-600 cursor-pointer hover:text-red-800"
            whileHover={{ scale: 1.1 }}
            onClick={() => onDelete(room.id)}
          >
            <Trash size={16} />
          </motion.button>
        </div>
      </div>

      <div
        onClick={handleSelect}
        className="mt-3 cursor-pointer flex  text-xs md:text-sm items-center"
      >
        <DollarSign size={16} className="text-green-600 mr-1" />
        <span className="font-medium">
          TZS {formatPrice(room.rent_price)}/month
        </span>
      </div>

      <div
        onClick={handleSelect}
        className="mt-3 w-full flex flex-col justify-end items-end"
      >
        <div
          className={`inline-flex items-center px-5 py-1 rounded text-xs font-medium ${
            room?.is_occupied
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {room?.is_occupied ? "Occupied" : "Vacant"}
        </div>
      </div>
    </motion.div>
  );
};

// House Item Component
const HouseItem = ({
  house,
  onEdit,
  onDelete,
  onAddRoom,
  onEditRoom,
  onDeleteRoom,
  showRoomForm,
  selectedRoom,
  handleSaveRoom,
  handleCancelRoomForm,
  roomId,
  Id,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { roomData } = useContext(DataContext);
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [room, setRoom] = useState([]);
  const [delNotification, setDelNotification] = useState(false);
  const [deleteData, setDeleteData] = useState([]);

  const rooms = roomData.filter((room) => room.house_id === house.id);

  const handleDelete = (houseId) => {
    onDelete(houseId);
    setDelNotification(false);
  };

  const handleNotification = (houseid) => {
    setDelNotification(true);
    if (houseid === house.id) {
      // handleDelete();
      setDeleteData(house);
    }
  };

  const handleCancel = () => {
    setDelNotification(false);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gray-50 md:p-4 relative p-2 flex justify-between items-center">
        <div className="flex items-center">
          <Home
            onClick={() => setExpanded(!expanded)}
            className="cursor-pointer text-blue-950/70 mr-2"
            size={50}
          />
          <div>
            <h3
              onClick={() => setExpanded(!expanded)}
              className="font-bold text-gray-500 cursor-pointer font-roboto text-sm md:text-lg"
            >
              {house.name}
            </h3>
            <p className="md:text-sm text-xs  font-raleway">
              {house.region}, {house.street} • {house.type}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* edit button */}
          <motion.button
            className="p-1 hover:bg-gray-200 cursor-pointer rounded-full"
            whileHover={{ scale: 1.1 }}
            onClick={() => onEdit(house)}
          >
            <Edit size={18} className="text-blue-600" />
          </motion.button>
          {/* delete button */}
          <motion.button
            className="p-1 hover:bg-gray-200 cursor-pointer rounded-full"
            whileHover={{ scale: 1.1 }}
            onClick={() => handleNotification(house.id)}
          >
            <Trash size={18} className="text-red-600" />
          </motion.button>
          {/* view button */}
          <motion.button
            className="p-1 hover:bg-gray-200 cursor-pointer rounded-full"
            whileHover={{ scale: 1.1 }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <motion.div animate={{ rotate: 180 }}>▲</motion.div>
            ) : (
              <motion.div animate={{ rotate: 0 }}>▼</motion.div>
            )}
          </motion.button>
        </div>

        {/* delete logic */}
        {delNotification && deleteData && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-0 bottom-0 flex flex-col   left-0 right-0 bg-red-100 "
          >
            <div className="h-full justify-between px-4 xl:px-80">
              <div className="flex flex-row items-center gap-5 mt-1 md:mt-2 ">
                {/* warning icon */}
                <div className="bg-red-50 rounded-full border border-red-600 p-1 md:p-2">
                  <IoWarningOutline className=" text-xl md:text-2xl  text-red-600 " />
                </div>
                <div>
                  <h1 className=" text-xs md:text-sm font-bold">
                    Are you sure you want to delete this house{" "}
                    {deleteData?.name} ?
                  </h1>
                  <p className=" text-xs md:text-xs ">
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex  justify-end gap-2 mt-1 md:mt-0">
                <motion.button
                  type="button"
                  className="bg-gray-500 cursor-pointer text-xs   hover:bg-gray-600 text-white font-bold py-1 px-4 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="button"
                  className="bg-red-600 cursor-pointer text-xs  hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(deleteData.id)}
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {house?.purpose === "Rent House" ? (
              <>
                <HouseDetailsCard house={house} />
              </>
            ) : (
              <>
                <div className="p-2 md:p-4  border-t">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-xs md:text-sm">
                      Rooms ({rooms?.length})
                    </h4>
                    <motion.button
                      className="flex items-center bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-3 py-1 text-xs rounded-md md:text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onAddRoom(house.id)}
                    >
                      <Plus size={14} className="mr-1" />
                      Add Room
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rooms?.map((rooms) => (
                      <>
                        <RoomCard
                          key={rooms.id}
                          room={rooms}
                          onEdit={() => onEditRoom(house.id, rooms)}
                          onDelete={() => onDeleteRoom(rooms.id)}
                          setRoom={setRoom}
                          setShowRoomDetails={setShowRoomDetails}
                          showRoomDetails={showRoomDetails}
                          selectedRoom={room?.id}
                        />
                        {/* for small devices */}
                        <div className="md:hidden">
                          {showRoomDetails && room?.id === rooms?.id ? (
                            <RoomDetailsCard
                              room={room}
                              house={house}
                              setShowRoomDetails={setShowRoomDetails}
                            />
                          ) : (
                            ""
                          )}

                          {/* roomform edit */}
                          {showRoomForm &&
                          Id === house.id &&
                          roomId === rooms?.id ? (
                            <RoomForm
                              room={selectedRoom}
                              houseId={house.id}
                              onSave={handleSaveRoom}
                              onCancel={handleCancelRoomForm}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                {/* large screen view */}
                <div className="hidden md:flex md:flex-col">
                  {/* show room details section */}
                  {showRoomDetails && (
                    <RoomDetailsCard
                      room={room}
                      house={house}
                      setShowRoomDetails={setShowRoomDetails}
                    />
                  )}

                  {/* roomform edit */}
                  {showRoomForm && Id === house.id ? (
                    <RoomForm
                      room={selectedRoom}
                      houseId={house.id}
                      onSave={handleSaveRoom}
                      onCancel={handleCancelRoomForm}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main House Component
const House = () => {
  const { houses, gethHouse } = useContext(UserContext);
  const { fetchRoom } = useContext(DataContext);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showHouseForm, setShowHouseForm] = useState(false);
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [ID, setID] = useState(null);
  const [roomId, setRoomId] = useState(null);

  // fuctios related to house
  const handleAddHouse = () => {
    setSelectedHouse(null);
    setShowHouseForm(true);
  };

  const handleEditHouse = (house) => {
    setSelectedHouse(house);
    setShowHouseForm(true);
  };

  const handleDeleteHouse = async (id) => {
    const { error } = await supabase2
      .from("house") // Specify your table name
      .delete() // Perform the delete operation
      .eq("id", id);

    if (error) {
      console.error("Error deleting House:", error.message);
      toast.error("Error deleting House:");
    } else {
      gethHouse(); // Refresh the house data after deletion
      toast.success("deleted successfully!!");
    }
  };
  //

  const handleSaveHouse = (house) => {
    setShowHouseForm(false);
  };

  const handleAddRoom = (houseId) => {
    setSelectedRoom(null);
    setShowRoomForm(true);
    setID(houseId);
  };

  const handleEditRoom = (houseId, room) => {
    setSelectedRoom(room);
    setShowRoomForm(true);
    setRoomId(room?.id);
    setID(houseId);
  };

  const handleDeleteRoom = async (roomId) => {
    const { error } = await supabase2
      .from("room") // Specify your table name
      .delete() // Perform the delete operation
      .eq("id", roomId);

    if (error) {
      console.error("Error deleting room:", error.message);
      toast.error("Error deleting Room:");
    } else {
      fetchRoom(); // Refresh the house data after deletion
      toast.success("deleted successfully!!");
    }
  };

  const handleSaveRoom = (room) => {
    setShowRoomForm(false);
  };
  const handleCancelHouseForm = () => {
    setShowHouseForm(false);
  };
  const handleCancelRoomForm = () => {
    setShowRoomForm(false);
  };

  useEffect(() => {
    gethHouse();
    fetchRoom();
  }, []);

  return (
    <div className="relative md:p-6 mt-20 md:mt-0 bg-gray-50">
      {/* house widgets */}
      <div className="">
        <HouseWidget />
      </div>
      <h1 className="md:text-2xl text-base text-end justify-end text-gray-500 font-raleway font-bold mb-4">
        House Management
      </h1>
      <div className="w-full  flex flex-col justify-end items-end">
        <motion.button
          className="bg-green-600 flex cursor-pointer text-sm items-center hover:bg-green-700 text-white px-4 py-1 rounded-md mb-4"
          whileTap={{ scale: 0.95 }}
          onClick={handleAddHouse}
        >
          <Plus size={16} className="mr-1" />
          Add House
        </motion.button>
      </div>

      {showHouseForm && (
        <HouseForm
          house={selectedHouse}
          onSave={handleSaveHouse}
          onCancel={handleCancelHouseForm}
        />
      )}

      {houses?.map((house) => (
        <HouseItem
          key={house.id}
          house={house}
          onEdit={handleEditHouse}
          onDelete={handleDeleteHouse}
          onAddRoom={handleAddRoom}
          onEditRoom={handleEditRoom}
          onDeleteRoom={handleDeleteRoom}
          showRoomForm={showRoomForm}
          selectedRoom={selectedRoom}
          handleSaveRoom={handleSaveRoom}
          handleCancelRoomForm={handleCancelRoomForm}
          roomId={roomId}
          Id={ID}
        />
      ))}
    </div>
  );
};
export default House;
