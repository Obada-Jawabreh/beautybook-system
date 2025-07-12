import React, { useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { GETmyBooking } from "@/services/user";
import { toast } from "react-toastify";
import {
  Calendar,
  Clock,
  User,
  DollarSign,
  Star,
  FileText,
  Download,
  MapPin,
} from "lucide-react";
import { formatTime, generatePDF, getStatusColor } from "@/utils/formHelpers";

function MyBooking() {
  const [bookingsList, setBookingsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { request: getMyBookings } = useApi(GETmyBooking);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getMyBookings();

        setBookingsList(response.bookings || []);
      } catch (error) {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
              My Bookings
            </h1>
            <p className="text-gray-600">
              View and manage your beauty service appointments
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {bookingsList.length}
                </div>
                <div className="text-sm text-gray-500">Total Bookings</div>
              </div>
            </div>
          </div>
        </div>

        {bookingsList.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              No bookings yet
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't made any appointments yet. Book your first service
              now!
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 mr-2" />
              Start booking services
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookingsList.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {booking.name_service}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Booking #{booking.id}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      booking.status_service
                    )}`}
                  >
                    {booking.status_service || "Pending"}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-3" />
                    <span className="text-sm">
                      Appointment #{booking.appointmentId}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-3" />
                    <span className="text-sm">
                      {formatTime(booking.booking_start_time)}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-3" />
                    <span className="text-sm">
                      {booking.staff_first_name} {booking.staff_last_name}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-3" />
                    <span className="text-sm font-medium">
                      ${booking.price}
                    </span>
                  </div>
                </div>

                {booking.description && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {booking.description}
                    </p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={() => generatePDF(booking)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export PDF</span>
                  </button>

                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Client ID: {booking.clientId}</span>
                    <span>Service ID: {booking.serviceId}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBooking;
