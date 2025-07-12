import React, { useEffect, useState } from "react";
import { ArrowLeft, User, Mail, Calendar, Star, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { GETCenterData } from "@/services/user";
import Loading from "@/components/shared/Loading";
import Card from "@/components/shared/Card";
function StaffPage() {
  const { centerId } = useParams();
  const navigate = useNavigate();
  const [staffMembers, setStaffMembers] = useState([]);
  const [centerInfo, setCenterInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await GETCenterData(centerId);
        setCenterInfo(response);
        setStaffMembers(response?.staff || []);
      } catch (error) {
        console.error("Failed to fetch staff data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffData();
  }, [centerId]);

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleStaffClick = (staffId) => {
    navigate(`/user/staff/details/${staffId}`);   };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mr-6 bg-white rounded-xl px-4 py-2 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Centers</span>
          </button>

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {centerInfo?.name || "Loading..."} Staff
            </h1>
            <p className="text-gray-600">
              Meet our professional team members and their specialties
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {staffMembers.length}
                </div>
                <div className="text-sm text-gray-500">Staff Members</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">{centerInfo?.name}</h2>
                <p className="text-blue-100 mb-2">{centerInfo?.email}</p>
                <p className="text-blue-100 text-sm">
                  Our experienced team is dedicated to providing exceptional
                  beauty services
                </p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <Loading
            text="Loading staff members..."
            description="Fetching center data, please wait."
          />
        ) : staffMembers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              No staff members found
            </h2>
            <p className="text-gray-600 mb-6">
              This center doesn't have any staff members registered yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {staffMembers.map((staff) => (
              <Card
                key={staff.id}
                data={staff}
                staffCardMode={true}
                showAvatar={true}
                showEmail={true}
                showJoinDate={true}
                showSpecialties={true}
                showPrice={false}
                showStaffInfo={false}
                showDescription={false}
                showEditIcon={false}
                showDeleteIcon={false}
                className="hover:shadow-lg"
                onClick={() => handleStaffClick(staff.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StaffPage;
