import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Clock,
  Calendar,
  DollarSign,
  Star,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { GETstaffDetails, POSTbooking } from "@/services/user";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function StaffDetails() {
  const { staffId } = useParams();
  const [staff, setStaff] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [error, setError] = useState(null);

  const groupSlotsByDate = (slots) => {
    const groupedSlots = {};

    slots.forEach((slot) => {
      if (!groupedSlots[slot.date]) {
        groupedSlots[slot.date] = {
          id: slot.id,
          date: slot.date,
          dayName: slot.dayName,
          slots: [],
        };
      }
      groupedSlots[slot.date].slots.push(...slot.slots);
    });

    return Object.values(groupedSlots).map((daySlot) => ({
      ...daySlot,
      slots: daySlot.slots.sort((a, b) => a.time.localeCompare(b.time)),
    }));
  };

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await GETstaffDetails(staffId);

        const { staff, availableSlots } = response;

        setStaff(staff);
        setServices(staff.services || []);

        const groupedSlots = groupSlotsByDate(availableSlots);

        setAvailableSlots(groupedSlots);
      } catch (err) {
        console.error("Error fetching staff details:", err);
        setError("Error loading staff details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (staffId) {
      fetchStaffDetails();
    }
  }, [staffId]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedSlot(null);
    setBookingConfirmed(false);
  };

  const handleSlotSelect = (daySlots, slot) => {
    if (slot.available) {
      setSelectedSlot({
        ...slot,
        date: daySlots.date,
        dayName: daySlots.dayName,
        appointmentId: daySlots.id,
      });
    }
  };

  const handleBooking = async () => {
    if (!selectedService || !selectedSlot) {
      console.error("Service or Slot not selected");
      return;
    }

    try {
      const bookingData = {
        appointmentId: selectedSlot.appointmentId,
        serviceId: selectedService.id,
        booking_start_time: selectedSlot.time,
        staff_id: staffId,
      };

      const response = await POSTbooking(bookingData);
      toast.success(response.message);

      console.log("Booking created:", response);

      setBookingConfirmed(true);
      setTimeout(() => {
        setBookingConfirmed(false);
        setSelectedService(null);
        setSelectedSlot(null);
      }, 3000);
    } catch (error) {
      console.error("Error creating booking:", error);
      setError("Error confirming booking. Please try again.");
    }
  };
  const handleGoBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading staff details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white py-2 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 shadow-lg text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h2>
          <div className="space-y-3 text-left bg-gray-50 rounded-xl p-4 mb-6">
            <p>
              <span className="font-semibold">Service:</span>{" "}
              {selectedService?.name}
            </p>
            <p>
              <span className="font-semibold">Staff:</span> {staff?.first_name}{" "}
              {staff?.last_name}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {selectedSlot?.dayName}, {selectedSlot?.date}
            </p>
            <p>
              <span className="font-semibold">Time:</span> {selectedSlot?.time}
            </p>
            <p>
              <span className="font-semibold">Price:</span>{" "}
              {selectedService?.price} JD
            </p>
          </div>
          <p className="text-gray-600 text-sm">
            You will receive a confirmation email shortly.
          </p>
        </div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <p className="text-gray-600">Staff not found</p>
        </div>
      </div>
    );
  }

  const avatar = `${staff.first_name?.[0] || ""}${
    staff.last_name?.[0] || ""
  }`.toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mr-6 bg-white rounded-xl px-4 py-2 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Book with {staff?.first_name} {staff?.last_name}
            </h1>
            <p className="text-gray-600">
              Select a service and choose your preferred time slot
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-2xl">
                  {avatar}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {staff?.first_name} {staff?.last_name}
                </h2>
                <p className="text-gray-600 mb-4">{staff?.email}</p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        staff?.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {staff?.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Available Services
                </h3>
                <div className="space-y-2">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-sm"
                    >
                      <div className="font-semibold">{service.name}</div>
                      <div className="text-xs text-blue-600">
                        {service.price} JD
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedService && selectedSlot && (
                <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Booking Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span className="font-semibold">
                        {selectedService.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-semibold">
                        {selectedSlot.dayName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-semibold">{selectedSlot.time}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Total:</span>
                      <span className="font-bold text-blue-600">
                        {selectedService.price} JD
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleBooking()}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-4"
                  >
                    Confirm Booking
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Available Services
              </h2>
              {services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedService?.id === service.id
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center font-semibold text-blue-600">
                          <DollarSign className="w-4 h-4 mr-1" />
                          <span>{service.price} JD</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No services available
                </div>
              )}
            </div>

            {selectedService && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Available Time Slots
                </h2>
                {availableSlots.length > 0 ? (
                  <div className="space-y-6">
                    {availableSlots.map((daySlots, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="border-b border-gray-100 pb-6 last:border-b-0"
                      >
                        <h3 className="font-semibold text-gray-900 mb-4">
                          {daySlots.dayName} - {daySlots.date}
                        </h3>
                        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                          {daySlots.slots.map((slot, slotIndex) => (
                            <button
                              key={slotIndex}
                              onClick={() => handleSlotSelect(daySlots, slot)}
                              disabled={!slot.available}
                              className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                slot.available
                                  ? selectedSlot?.time === slot.time &&
                                    selectedSlot?.date === daySlots.date
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                                  : "bg-gray-50 text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                        {daySlots.slots.every((slot) => !slot.available) && (
                          <div className="flex items-center justify-center p-6 bg-red-50 rounded-xl mt-4">
                            <XCircle className="w-5 h-5 text-red-500 mr-2" />
                            <span className="text-red-600 font-medium">
                              All slots are booked for this day
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No available time slots
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDetails;
