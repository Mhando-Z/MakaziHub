"use client";

import React, { useState } from "react";
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
} from "lucide-react";

// Mock data - in a real app this would come from your API
const mockHouses = [
  {
    id: 1,
    name: "Sunshine Apartments",
    location: { region: "Dar es Salaam", city: "Kinondoni" },
    type: "apartment",
    rooms: [
      {
        id: 101,
        name: "101",
        type: "Single",
        rent: 150000,
        tenant: "John Doe",
        status: "occupied",
        startDate: "2025-01-15",
        duration: 6,
      },
      {
        id: 102,
        name: "102",
        type: "Master",
        rent: 250000,
        tenant: null,
        status: "vacant",
        startDate: null,
        duration: null,
      },
      {
        id: 103,
        name: "103",
        type: "Single",
        rent: 150000,
        tenant: "Sarah Johnson",
        status: "occupied",
        startDate: "2025-02-01",
        duration: 12,
      },
    ],
  },
  {
    id: 2,
    name: "Coastal Villa",
    location: { region: "Dar es Salaam", city: "Mikocheni" },
    type: "bungalow",
    rooms: [
      {
        id: 201,
        name: "Master Bedroom",
        type: "Master",
        rent: 350000,
        tenant: "Michael Brown",
        status: "occupied",
        startDate: "2025-03-01",
        duration: 3,
      },
      {
        id: 202,
        name: "Guest Room 1",
        type: "Single",
        rent: 180000,
        tenant: null,
        status: "vacant",
        startDate: null,
        duration: null,
      },
      {
        id: 203,
        name: "Guest Room 2",
        type: "Single",
        rent: 180000,
        tenant: null,
        status: "vacant",
        startDate: null,
        duration: null,
      },
    ],
  },
  {
    id: 3,
    name: "Urban Residency",
    location: { region: "Arusha", city: "Central" },
    type: "apartment",
    rooms: [
      {
        id: 301,
        name: "A1",
        type: "Single",
        rent: 120000,
        tenant: "Emily Davis",
        status: "occupied",
        startDate: "2024-12-01",
        duration: 12,
      },
      {
        id: 302,
        name: "A2",
        type: "Single",
        rent: 120000,
        tenant: "Daniel Wilson",
        status: "occupied",
        startDate: "2025-01-10",
        duration: 6,
      },
      {
        id: 303,
        name: "A3",
        type: "Master",
        rent: 200000,
        tenant: "Lisa Moore",
        status: "occupied",
        startDate: "2024-11-15",
        duration: 12,
      },
      {
        id: 304,
        name: "A4",
        type: "Single",
        rent: 120000,
        tenant: null,
        status: "vacant",
        startDate: null,
        duration: null,
      },
    ],
  },
];

// House Form Component
const HouseForm = ({ house = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: house?.name || "",
    region: house?.location?.region || "",
    city: house?.location?.city || "",
    type: house?.type || "apartment",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: house?.id || Date.now(),
      name: formData.name,
      location: { region: formData.region, city: formData.city },
      type: formData.type,
      rooms: house?.rooms || [],
    });
  };

  return (
    <motion.form
      className="bg-white p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">
        {house ? "Edit House" : "Add New House"}
      </h2>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          House Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="region"
          >
            Region
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="city"
          >
            City
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="type"
        >
          House Type
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="apartment">Apartment</option>
          <option value="bungalow">Bungalow</option>
          <option value="duplex">Duplex</option>
          <option value="townhouse">Townhouse</option>
        </select>
      </div>

      <div className="flex justify-end gap-2">
        <motion.button
          type="button"
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCancel}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {house ? "Update" : "Save"}
        </motion.button>
      </div>
    </motion.form>
  );
};

// Room Form Component
const RoomForm = ({ room = null, houseId, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: room?.name || "",
    type: room?.type || "Single",
    rent: room?.rent || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: room?.id || Date.now(),
      name: formData.name,
      type: formData.type,
      rent: parseInt(formData.rent),
      tenant: room?.tenant || null,
      status: room?.status || "vacant",
      startDate: room?.startDate || null,
      duration: room?.duration || null,
    });
  };

  return (
    <motion.form
      className="bg-white p-6 rounded-lg  shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">
        {room ? "Edit Room" : "Add New Room"}
      </h2>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="roomName"
        >
          Room Name/Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="roomName"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter room name or number"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="roomType"
        >
          Room Type
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="roomType"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="Single">Single</option>
          <option value="Master">Master</option>
        </select>
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="roomRent"
        >
          Monthly Rent (TZS)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="roomRent"
          type="number"
          name="rent"
          value={formData.rent}
          onChange={handleChange}
          placeholder="Enter monthly rent"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <motion.button
          type="button"
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCancel}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {room ? "Update" : "Save"}
        </motion.button>
      </div>
    </motion.form>
  );
};

// Room Card Component
const RoomCard = ({ room, onEdit, onDelete }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow p-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ boxShadow: "0px 4px 15px rgba(0,0,0,0.1)" }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{room.name}</h3>
          <p className="text-sm text-gray-600">{room.type} Room</p>
        </div>
        <div className="flex gap-1">
          <motion.button
            className="p-1 text-blue-600 hover:text-blue-800"
            whileHover={{ scale: 1.1 }}
            onClick={() => onEdit(room)}
          >
            <Edit size={16} />
          </motion.button>
          <motion.button
            className="p-1 text-red-600 hover:text-red-800"
            whileHover={{ scale: 1.1 }}
            onClick={() => onDelete(room.id)}
          >
            <Trash size={16} />
          </motion.button>
        </div>
      </div>

      <div className="mt-3 flex items-center">
        <DollarSign size={16} className="text-green-600 mr-1" />
        <span className="font-medium">
          TZS {room.rent.toLocaleString()}/month
        </span>
      </div>

      <div className="mt-3">
        <div
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
            room.status === "occupied"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {room.status === "occupied" ? "Occupied" : "Vacant"}
        </div>
      </div>

      {room.status === "occupied" && (
        <div className="mt-3 border-t pt-3">
          <div className="flex items-center mb-1">
            <User size={14} className="text-gray-600 mr-1" />
            <span className="text-sm">{room.tenant}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="text-gray-600 mr-1" />
            <span className="text-sm">{`Since ${room.startDate} (${room.duration} months)`}</span>
          </div>
        </div>
      )}
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
  Id,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gray-50 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Home className="text-blue-950 mr-2" size={50} />
          <div>
            <h3 className="font-bold font-roboto text-lg">{house.name}</h3>
            <p className="text-sm text-gray-600 font-raleway">
              {house.location.region}, {house.location.city} • {house.type}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            className="p-1 hover:bg-gray-200 rounded-full"
            whileHover={{ scale: 1.1 }}
            onClick={() => onEdit(house)}
          >
            <Edit size={18} className="text-blue-600" />
          </motion.button>
          <motion.button
            className="p-1 hover:bg-gray-200 rounded-full"
            whileHover={{ scale: 1.1 }}
            onClick={() => onDelete(house.id)}
          >
            <Trash size={18} className="text-red-600" />
          </motion.button>
          <motion.button
            className="p-1 hover:bg-gray-200 rounded-full"
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
            <div className="p-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Rooms ({house.rooms.length})</h4>
                <motion.button
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAddRoom(house.id)}
                >
                  <Plus size={14} className="mr-1" />
                  Add Room
                </motion.button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {house.rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onEdit={() => onEditRoom(house.id, room)}
                    onDelete={() => onDeleteRoom(house.id, room.id)}
                  />
                ))}
              </div>
            </div>
            {showRoomForm && Id === house.id ? (
              <RoomForm
                room={selectedRoom}
                houseId={selectedRoom?.houseId}
                onSave={handleSaveRoom}
                onCancel={handleCancelRoomForm}
              />
            ) : (
              ""
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main House Component
const House = () => {
  const [houses, setHouses] = useState(mockHouses);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showHouseForm, setShowHouseForm] = useState(false);
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [ID, setID] = useState(null);

  const handleAddHouse = () => {
    setSelectedHouse(null);
    setShowHouseForm(true);
  };

  const handleEditHouse = (house) => {
    setSelectedHouse(house);
    setShowHouseForm(true);
  };

  const handleDeleteHouse = (id) => {
    setHouses((prev) => prev.filter((house) => house.id !== id));
  };

  const handleSaveHouse = (house) => {
    if (selectedHouse) {
      setHouses((prev) => prev.map((h) => (h.id === house.id ? house : h)));
    } else {
      setHouses((prev) => [...prev, house]);
    }
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
    setID(houseId);
  };

  const handleDeleteRoom = (houseId, roomId) => {
    setHouses((prev) =>
      prev.map((house) =>
        house.id === houseId
          ? {
              ...house,
              rooms: house.rooms.filter((room) => room.id !== roomId),
            }
          : house
      )
    );
  };

  const handleSaveRoom = (room) => {
    if (selectedRoom) {
      setHouses((prev) =>
        prev.map((house) =>
          house.id === selectedRoom.houseId
            ? {
                ...house,
                rooms: house.rooms.map((r) => (r.id === room.id ? room : r)),
              }
            : house
        )
      );
    } else {
      setHouses((prev) =>
        prev.map((house) =>
          house.id === selectedRoom.houseId
            ? { ...house, rooms: [...house.rooms, room] }
            : house
        )
      );
    }
    setShowRoomForm(false);
  };
  const handleCancelHouseForm = () => {
    setShowHouseForm(false);
  };
  const handleCancelRoomForm = () => {
    setShowRoomForm(false);
  };
  return (
    <div className="relative">
      <h1 className="text-2xl font-raleway font-bold mb-4">House Management</h1>
      <motion.button
        className="bg-green-600 flex items-center hover:bg-green-700 text-white px-4 py-2 rounded-md mb-4"
        whileTap={{ scale: 0.95 }}
        onClick={handleAddHouse}
      >
        <Plus size={16} className="mr-1" />
        Add House
      </motion.button>

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
          Id={ID}
        />
      ))}
    </div>
  );
};
export default House;
