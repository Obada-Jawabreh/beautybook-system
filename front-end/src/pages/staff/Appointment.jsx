// إصدار محدث ومحسن من مكون Appointment:

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  CalendarDays,
  Timer,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Users,
  DollarSign,
  Edit,
  Mail,
} from "lucide-react";
import Card from "@/components/shared/Card";
import Button from "@/components/shared/inputs/Button";
import { ScheduleSchema } from "@/schema/staff";
import {
  GETAllAppointments,
  PUTUpdateAppointment,
  DELETEAppointment,
  POSTaddAppointment,
} from "@/services/staff";

function Appointment() {
  const [schedulesList, setSchedulesList] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ScheduleSchema),
    mode: "onChange",
    defaultValues: {
      date: "",
      start_time: "",
      end_time: "",
    },
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setError(null);
        const response = await GETAllAppointments();
        console.log("API Response:", response); // للتتبع

        if (
          response &&
          response.appointments &&
          Array.isArray(response.appointments)
        ) {
          // تصفية البيانات للتأكد من سلامتها
          const validSchedules = response.appointments.filter(
            (schedule) =>
              schedule &&
              schedule.id &&
              schedule.schedule_date &&
              schedule.start_time &&
              schedule.end_time
          );
          setSchedulesList(validSchedules);
        } else {
          console.error("Invalid API response format:", response);
          setSchedulesList([]);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to load appointments");
        setSchedulesList([]);
      }
    };
    fetchAppointments();
  }, []);

  const formatDate = (date) => {
    if (!date) return "No date";
    try {
      const formattedDate = new Date(date);
      return formattedDate?.toLocaleDateString("en-GB");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const formatTime = (time) => {
    if (!time) return "No time";
    try {
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours);
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      return `${displayHour}:${minutes} ${period}`;
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid time";
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        schedule_date: data.date,
        start_time: data.start_time,
        end_time: data.end_time,
      };

      if (selectedSchedule) {
        await PUTUpdateAppointment(selectedSchedule.id, payload);
        setSchedulesList((prev) =>
          prev.map((s) =>
            s.id === selectedSchedule.id ? { ...s, ...payload } : s
          )
        );
        setSelectedSchedule(null);
      } else {
        const response = await POSTaddAppointment(payload);
        if (response && response.appointment) {
          setSchedulesList((prev) => [...prev, response.appointment]);
        }
      }

      reset();
    } catch (error) {
      console.error("Error submitting schedule:", error);
      setError("Failed to save schedule");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (schedule) => {
    console.log("Editing schedule:", schedule); // للتتبع

    if (!schedule) {
      console.error("Schedule is undefined or null");
      setError("Invalid schedule data");
      return;
    }

    if (!schedule.schedule_date || !schedule.start_time || !schedule.end_time) {
      console.error("Schedule is missing required fields:", schedule);
      setError("Schedule is missing required data");
      return;
    }

    try {
      reset({
        date: schedule.schedule_date,
        start_time: schedule.start_time,
        end_time: schedule.end_time,
      });
      setSelectedSchedule(schedule);
      setError(null);
    } catch (error) {
      console.error("Error setting schedule for editing:", error);
      setError("Failed to load schedule for editing");
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Invalid schedule ID");
      return;
    }

    if (window.confirm("Are you sure you want to delete this schedule?")) {
      try {
        await DELETEAppointment(id);
        setSchedulesList((prev) =>
          prev.filter((schedule) => schedule.id !== id)
        );
        if (selectedSchedule?.id === id) {
          setSelectedSchedule(null);
          reset();
        }
        setError(null);
      } catch (error) {
        console.error("Error deleting schedule:", error);
        setError("Failed to delete schedule");
      }
    }
  };

  // عرض رسالة الخطأ إذا وجدت
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <p className="text-red-800">{error}</p>
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
              Schedule Management
            </h1>
            <p className="text-gray-600">
              Manage your working hours and availability
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {schedulesList.length}
                </div>
                <div className="text-sm text-gray-500">Total Schedules</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {schedulesList.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-sm border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CalendarDays className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  No schedules yet
                </h2>
                <p className="text-gray-600 mb-6">
                  Add your first schedule to get started
                </p>
                <div className="inline-flex items-center px-6 py-3 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                  <Plus className="w-4 h-4 mr-2" />
                  Start by adding a schedule
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {schedulesList
                  .filter((schedule) => schedule && schedule.id) // تصفية إضافية
                  .map((schedule) => (
                    <Card
                      key={schedule.id}
                      data={schedule}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      showEditIcon={true}
                      showDeleteIcon={true}
                      showStaffInfo={false}
                      showPrice={false}
                      showDescription={true}
                      keys={{
                        title: "day_name",
                        description: (data) => {
                          if (!data) return "No data available";

                          const date = data.schedule_date
                            ? formatDate(data.schedule_date)
                            : "No date";
                          const startTime = data.start_time
                            ? formatTime(data.start_time)
                            : "No start time";
                          const endTime = data.end_time
                            ? formatTime(data.end_time)
                            : "No end time";

                          return `${date} • ${startTime} - ${endTime}`;
                        },
                      }}
                    />
                  ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedSchedule ? "Edit Schedule" : "Add New Schedule"}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {selectedSchedule
                      ? "Update schedule details"
                      : "Create a new schedule"}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <div className="relative">
                        <input
                          {...field}
                          type="date"
                          className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.date ? "border-red-500" : ""
                          }`}
                        />
                        <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                      {errors.date && (
                        <p className="text-red-500 text-sm">
                          {errors.date.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="start_time"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Start Time
                      </label>
                      <div className="relative">
                        <input
                          {...field}
                          type="time"
                          className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.start_time ? "border-red-500" : ""
                          }`}
                        />
                        <Clock className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                      {errors.start_time && (
                        <p className="text-red-500 text-sm">
                          {errors.start_time.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="end_time"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        End Time
                      </label>
                      <div className="relative">
                        <input
                          {...field}
                          type="time"
                          className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.end_time ? "border-red-500" : ""
                          }`}
                        />
                        <Clock className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                      {errors.end_time && (
                        <p className="text-red-500 text-sm">
                          {errors.end_time.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Button
                  onClick={handleSubmit(onSubmit)}
                  disabled={!isValid || loading}
                  className="w-full h-12 text-white"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>
                        {selectedSchedule ? "Update Schedule" : "Add Schedule"}
                      </span>
                    </>
                  )}
                </Button>

                {selectedSchedule && (
                  <Button
                    onClick={() => {
                      setSelectedSchedule(null);
                      reset();
                      setError(null);
                    }}
                    className="w-full h-10 text-gray-600"
                  >
                    Cancel Edit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
