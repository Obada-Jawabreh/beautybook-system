import { useEffect, useState } from "react";
import {
  Building2,
  Users,
  MapPin,
  Phone,
  Star,
  ChevronRight,
} from "lucide-react";
import Card from "@/components/shared/Card";
import { GETallAdmin } from "@/services/user";
import { useNavigate } from "react-router-dom";
function AdminsPage() {
  const Navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await GETallAdmin();
        setAdmins(response.admins || []);
      } catch (error) {
        console.error("Failed to fetch admins", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleCenterClick = (admin) => {
    Navigate(`/user/staff/${admin.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Beauty Centers
            </h1>
            <p className="text-gray-600">
              Discover and explore all available beauty centers in your area
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {admins.length}
                </div>
                <div className="text-sm text-gray-500">Total Centers</div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {admins.reduce(
                    (sum, admin) => sum + (admin.staff_count || 0),
                    0
                  )}
                </div>
                <div className="text-sm text-gray-500">Total Staff</div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} loading={true} />
            ))}
          </div>
        ) : admins.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              No beauty centers found
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any beauty centers at the moment. Please check
              back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {admins.map((admin) => (
              <Card
                key={admin.id}
                data={admin}
                onClick={handleCenterClick}
                showEditIcon={false}
                showDeleteIcon={false}
                showPrice={false}
                showDescription={false}
                showEmail={true}
                className="bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-200 hover:from-blue-200 hover:to-blue-300 hover:border-blue-300"
                keys={{
                  title: (data) => `${data.first_name} ${data.last_name}`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminsPage;
