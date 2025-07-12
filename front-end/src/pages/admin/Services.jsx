import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServiceSchema } from "@/schema/admin";
import InputForm from "@/components/shared/inputs/InputForm";
import Dropdown from "@/components/shared/inputs/Dropdown";
import Button from "@/components/shared/inputs/Button";
import Card from "@/components/shared/Card";
import { useApi } from "@/hooks/useApi";
import {
  POSTservice,
  PUTservice,
  DELETEservice,
  GETservicesAndStaff,
} from "@/services/admin";
import { toast } from "react-toastify";
import { Plus, Edit, Trash2, DollarSign, User, Star } from "lucide-react";

function AdminServicesPage() {
  const [servicesList, setServicesList] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [staffList, setStaffList] = useState([]);

  const { request: addService } = useApi(POSTservice);
  const { request: updateService } = useApi(PUTservice);
  const { request: deleteService } = useApi(DELETEservice);
  const { request: servicesAndStaff } = useApi(GETservicesAndStaff);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ServiceSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      staff_id: "",
      price: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchAll = async () => {
      const response = await servicesAndStaff();

      setServicesList(response.services);
      setStaffList(
        response.staff.map((s) => ({
          label: `${s.first_name} ${s.last_name}`,
          value: s.id,
        }))
      );
    };
    fetchAll();
  }, []);

  const onSubmit = async (data) => {
    try {
      const payload = { ...data };

      if (selectedService) {
        const response = await updateService(selectedService.id, payload);
        toast.success(response.message);
        setServicesList((prev) =>
          prev.map((s) =>
            s.id === selectedService.id
              ? {
                  ...s,
                  ...payload,
                  staff: staffList.find((st) => st.value === payload.staff_id)
                    ?.label,
                }
              : s
          )
        );
        reset({
          name: "",
          staff_id: "",
          price: "",
          description: "",
        });
        setSelectedService(null);
      } else {
        const response = await addService(payload);
        toast.success(response.message);
        setServicesList((prev) => [
          ...prev,
          {
            ...response.service,
            staff: staffList.find((s) => s.value === payload.staff_id)?.label,
          },
        ]);
      }

      reset();
      setSelectedService(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed on submit");
    }
  };

  const handleEdit = (service) => {
    reset({
      name: service.name,
      staff_id: service.staff_id,
      price: service.price,
      description: service.description,
    });
    setSelectedService(service);
  };

  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      toast.success("Service deleted successfully");
      setServicesList((prev) => prev.filter((service) => service.id !== id));
      if (selectedService?.id === id) {
        setSelectedService(null);
        reset();
      }
    } catch (error) {
      toast.error("Failed to delete service");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Services Management
            </h1>
            <p className="text-gray-600">
              Manage your beauty services and staff assignments
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {servicesList.length}
                </div>
                <div className="text-sm text-gray-500">Total Services</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {servicesList.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-sm border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  No services yet
                </h2>
                <p className="text-gray-600 mb-6">
                  Add your first service and assign it to your staff members
                </p>
                <div className="inline-flex items-center px-6 py-3 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                  <Plus className="w-4 h-4 mr-2" />
                  Start by adding a service
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {servicesList.map((service) => (
                  <Card
                    key={service.id}
                    data={service}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    showEditIcon={true}
                    showDeleteIcon={true}
                    showStaffInfo={true}
                    keys={{
                      title: (data) =>
                        `${data.name} - ${data.staff.first_name} ${data.staff.last_name}`,
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
                    {selectedService ? "Edit Service" : "Add New Service"}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {selectedService
                      ? "Update service details"
                      : "Create a new service"}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      label="Service Name"
                      id="name"
                      errors={errors.name}
                      field={field}
                    />
                  )}
                />

                <Controller
                  name="staff_id"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      headLabel="Select Staff"
                      label="Staff Member"
                      options={staffList}
                      onSelect={(value) => field.onChange(Number(value))}
                      value={field.value}
                      error={{ message: errors.staff_id?.message || "" }}
                      required
                    />
                  )}
                />

                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      label="Price"
                      id="price"
                      errors={errors.price}
                      field={field}
                      inputType="number"
                    />
                  )}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        {...field}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Describe your service..."
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Button
                  onClick={handleSubmit(onSubmit)}
                  disabled={!isValid}
                  className="w-full h-10 text-gray-600"
                >
                  <Plus className="w-5 h-5" />
                  <span>
                    {selectedService ? "Update Service" : "Add Service"}
                  </span>
                </Button>

                {selectedService && (
                  <Button
                    onClick={() => {
                      setSelectedService(null);
                      reset();
                    }}
                    className="w-full h-10 text-gray-600  "
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

export default AdminServicesPage;
