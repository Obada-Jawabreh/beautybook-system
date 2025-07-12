import React, { useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { GETMyUsers, PUTbooking } from "@/services/staff";
import { toast } from "react-toastify";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  DollarSign,
  User,
  Mail,
  Scissors,
} from "lucide-react";
import ReusableTable from "@/components/shared/ReusableTable";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Pending", value: "pending" },
  { label: "Cancelled", value: "cancelled" },
];

function MyUsers() {
  const [clients, setClients] = useState([]);

  const { request: getMyUsers } = useApi(GETMyUsers);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getMyUsers();
        setClients(response.clients || []);
      } catch (error) {
        toast.error("Failed to fetch clients");
      }
    };
    fetchClients();
  }, []);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await PUTbooking(bookingId, newStatus);

      toast.success(`Booking ${newStatus} successfully`);

      setClients((prev) =>
        prev.map((client) =>
          client.bookingId === bookingId
            ? { ...client, bookingStatus: newStatus }
            : client
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update booking status");
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const confirmedCount = clients.filter(
    (client) => client.bookingStatus === "confirmed"
  ).length;
  const pendingCount = clients.filter(
    (client) => client.bookingStatus === "pending"
  ).length;
  const cancelledCount = clients.filter(
    (client) => client.bookingStatus === "cancelled"
  ).length;

  const clientStats = [
    {
      label: "Total Bookings",
      value: clients.length,
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      bgClass: "bg-blue-100",
      textClass: "text-blue-600",
    },
    {
      label: "Confirmed",
      value: confirmedCount,
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      bgClass: "bg-green-100",
      textClass: "text-green-600",
    },
    {
      label: "Pending",
      value: pendingCount,
      icon: <Clock className="w-6 h-6 text-yellow-600" />,
      bgClass: "bg-yellow-100",
      textClass: "text-yellow-600",
    },
    {
      label: "Cancelled",
      value: cancelledCount,
      icon: <XCircle className="w-6 h-6 text-red-600" />,
      bgClass: "bg-red-100",
      textClass: "text-red-600",
    },
  ];

  const columns = [
    {
      key: "client",
      header: "Client",
      render: (client) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-medium text-sm">
              {client.clientFirstName.charAt(0)}
              {client.clientLastName.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {client.clientFirstName} {client.clientLastName}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <Mail className="w-3 h-3 mr-1" />
              {client.clientEmail}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "service",
      header: "Service",
      render: (client) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <Scissors className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {client.serviceName}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <DollarSign className="w-3 h-3 mr-1" />
              {client.servicePrice}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "time",
      header: "Time",
      render: (client) => (
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">{client.bookingStartTime}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (client) => (
        <span
          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            client.bookingStatus
          )}`}
        >
          {getStatusIcon(client.bookingStatus)}
          <span className="capitalize">{client.bookingStatus}</span>
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (client, onStatusChange) => (
        <div className="flex items-center space-x-2">
          {client.bookingStatus !== "confirmed" && (
            <button
              onClick={() => onStatusChange(client.bookingId, "confirmed")}
              className="flex items-center space-x-1 px-3 py-1 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Confirm</span>
            </button>
          )}
          {client.bookingStatus !== "cancelled" && (
            <button
              onClick={() => onStatusChange(client.bookingId, "cancelled")}
              className="flex items-center space-x-1 px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
            >
              <XCircle className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          )}
        </div>
      ),
    },
  ];

  const searchFields = [
    "clientFirstName",
    "clientLastName",
    "clientEmail",
    "serviceName",
  ];

  return (
    <ReusableTable
      data={clients}
      columns={columns}
      title="My Clients"
      subtitle="Manage your client bookings and appointments"
      stats={clientStats}
      statusOptions={statusOptions}
      onStatusChange={handleStatusUpdate}
      searchFields={searchFields}
      emptyStateMessage="No client bookings found"
      filterKey="bookingStatus"
    />
  );
}

export default MyUsers;
