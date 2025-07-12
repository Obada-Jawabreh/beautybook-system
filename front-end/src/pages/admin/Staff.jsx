import React, { useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { GETAllStaff, PUTUpdateStaffStatus } from "@/services/admin";
import { toast } from "react-toastify";
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Check,
  X,
} from "lucide-react";
import ReusableTable from "@/components/shared/ReusableTable";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

function AdminStaffPage() {
  const [staffList, setStaffList] = useState([]);

  const { request: getAllStaff } = useApi(GETAllStaff);
  const { request: updateStaffStatus } = useApi(PUTUpdateStaffStatus);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await getAllStaff();
        setStaffList(response.staff || []);
      } catch (error) {
        toast.error("Failed to fetch staff");
      }
    };
    fetchStaff();
  }, []);

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

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (staff) => (
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
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (staff) => (
        <span className="text-gray-700">{staff.email}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (staff) => (
        <span
          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            staff.status
          )}`}
        >
          {getStatusIcon(staff.status)}
          <span className="capitalize">{staff.status}</span>
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (staff, onStatusChange) => (
        <div className="flex items-center space-x-2">
          {staff.status !== "approved" && (
            <button
              onClick={() => onStatusChange(staff.id, "approved")}
              className="flex items-center space-x-1 px-3 py-1 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm"
            >
              <Check className="w-4 h-4" />
              <span>Approve</span>
            </button>
          )}
          {staff.status !== "rejected" && (
            <button
              onClick={() => onStatusChange(staff.id, "rejected")}
              className="flex items-center space-x-1 px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
            >
              <X className="w-4 h-4" />
              <span>Reject</span>
            </button>
          )}
        </div>
      ),
    },
  ];

  const searchFields = ["first_name", "last_name", "email", "phone"];

  return (
    <ReusableTable
      data={staffList}
      columns={columns}
      title="Staff Management"
      subtitle="Manage staff members and their approval status"
      stats={staffStats}
      statusOptions={statusOptions}
      onStatusChange={handleStatusUpdate}
      searchFields={searchFields}
      emptyStateMessage="No staff members have been added yet"
      filterKey="status"
    />
  );
}

export default AdminStaffPage;