import React, { useState, useEffect } from "react";
import {
  Star,
  DollarSign,
  User,
  Calendar,
  Heart,
  Sparkles,
} from "lucide-react";
import Card from "@/components/shared/Card";
import { GETMyServices } from "@/services/staff";

function MyServicesPage() {
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyServices = async () => {
      try {
        const response = await GETMyServices();
        setMyServices(response.services || []);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyServices();
  }, []);
  const totalServices = myServices.length;
  const averagePrice =
    myServices.length > 0
      ? Math.round(
          myServices.reduce((sum, service) => sum + service.price, 0) /
            myServices.length
        )
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-gray-600">Loading your services...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              My Services
            </h1>
            <p className="text-gray-600">
              Discover the beauty services assigned to you
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {totalServices}
                </div>
                <div className="text-sm text-gray-500">Total Services</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  ${averagePrice}
                </div>
                <div className="text-sm text-gray-500">Avg. Price</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {totalServices}
                </div>
                <div className="text-sm text-gray-500">Active Services</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  ${myServices.reduce((sum, service) => sum + service.price, 0)}
                </div>
                <div className="text-sm text-gray-500">Total Value</div>
              </div>
            </div>
          </div>
        </div>

        {myServices.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              No services assigned yet
            </h2>
            <p className="text-gray-600 mb-6">
              Contact your administrator to get services assigned to you
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
              <Calendar className="w-4 h-4 mr-2" />
              Services coming soon
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myServices.map((service) => (
              <Card
                key={service.id}
                data={service}
                showEditIcon={false}
                showDeleteIcon={false}
                showStaffInfo={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyServicesPage;
