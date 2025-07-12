import React, { useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { GETAllStaff, PUTUpdateStaffStatus } from "@/services/admin";
import { toast } from "react-toastify";
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Search,
  Filter,
  Check,
  X,
  Eye,
} from "lucide-react";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

function AdminStaffPage() {
  const [staffList, setStaffList] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { request: getAllStaff } = useApi(GETAllStaff);
  const { request: updateStaffStatus } = useApi(PUTUpdateStaffStatus);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await getAllStaff();
        setStaffList(response.staff || []);
        setFilteredStaff(response.staff || []);
      } catch (error) {
        toast.error("Failed to fetch staff");
      }
    };
    fetchStaff();
  }, []);

  useEffect(() => {
    let filtered = staffList;

    if (selectedStatus !== "all") {
      filtered = filtered.filter((staff) => staff.status === selectedStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (staff) =>
          `${staff.first_name} ${staff.last_name}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          staff.phone.includes(searchQuery)
      );
    }

    setFilteredStaff(filtered);
  }, [staffList, selectedStatus, searchQuery]);

  const handleStatusUpdate = async (staffId, newStatus) => {
    try {
      const response = await updateStaffStatus(staffId, newStatus);
      toast.success(response.message);

      setStaffList((prev) =>
        prev.map((staff) =>
          staff.id === staffId ? { ...staff, status: newStatus } : staff
        )
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <UserCheck className="w-4 h-4" />;
      case "rejected":
        return <UserX className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const approvedCount = staffList.filter(
    (staff) => staff.status === "approved"
  ).length;
  const pendingCount = staffList.filter(
    (staff) => staff.status === "pending"
  ).length;
  const rejectedCount = staffList.filter(
    (staff) => staff.status === "rejected"
  ).length;
  const staffStats = [
    {
      label: "Total Staff",
      value: staffList.length,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bgClass: "bg-blue-100",
      textClass: "text-blue-600",
    },
    {
      label: "Approved",
      value: approvedCount,
      icon: <UserCheck className="w-6 h-6 text-green-600" />,
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
      label: "Rejected",
      value: rejectedCount,
      icon: <UserX className="w-6 h-6 text-red-600" />,
      bgClass: "bg-red-100",
      textClass: "text-red-600",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Staff Management
            </h1>
            <p className="text-gray-600">
              Manage staff members and their approval status
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {staffStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 ${stat.bgClass} rounded-xl flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search staff..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Showing {filteredStaff.length} of {staffList.length} staff
                members
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">
                    Name
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">
                    Email
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">
                    Phone
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">
                    Specialization
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-900">
                            No staff found
                          </p>
                          <p className="text-gray-500">
                            {searchQuery || selectedStatus !== "all"
                              ? "Try adjusting your search or filter criteria"
                              : "No staff members have been added yet"}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStaff.map((staff) => (
                    <tr
                      key={staff.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {staff.first_name.charAt(0)}
                              {staff.last_name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {staff.first_name} {staff.last_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700">{staff.email}</td>
                      <td className="py-4 px-6 text-gray-700">{staff.phone}</td>
                      <td className="py-4 px-6 text-gray-700">
                        {staff.specialization}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            staff.status
                          )}`}
                        >
                          {getStatusIcon(staff.status)}
                          <span className="capitalize">{staff.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          {staff.status !== "approved" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(staff.id, "approved")
                              }
                              className="flex items-center space-x-1 px-3 py-1 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm"
                            >
                              <Check className="w-4 h-4" />
                              <span>Approve</span>
                            </button>
                          )}
                          {staff.status !== "rejected" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(staff.id, "rejected")
                              }
                              className="flex items-center space-x-1 px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
                            >
                              <X className="w-4 h-4" />
                              <span>Reject</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStaffPage;
