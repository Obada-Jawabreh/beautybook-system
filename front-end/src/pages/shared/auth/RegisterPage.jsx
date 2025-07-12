import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputForm from "@/components/shared/inputs/InputForm";
import Button from "@/components/shared/inputs/Button";
import { RegisterSchema } from "@/schema/shared";
import { useApi } from "@/hooks/useApi";
import { POSTregister, GETadmins } from "@/services/auth";
import Dropdown from "@/components/shared/inputs/Dropdown";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { request } = useApi(POSTregister);
  const [adminsOptions, setAdminsOptions] = useState([]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      role: "",
      admin_id: undefined,
    },
  });
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await GETadmins();

        const options = response.admins.map((admin) => ({
          label: `${admin.first_name} ${admin.last_name}`,
          value: admin.id,
        }));
        setAdminsOptions(options);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdmins();
  }, []);
  const onSubmit = async (data) => {
    if (data.role !== "staff") {
      delete data.admin_id;
    }
    try {
      const response = await request(data);
      toast.success(response.message);
      localStorage.setItem("token", response.token ?? "");

      localStorage.setItem("role", response.user.role);

      const userRole = response.user.role;
      if (userRole === "admin") {
        navigate("/admin/services");
      } else if (userRole === "staff") {
        navigate("/staff/appointments");
      } else if (userRole === "user") {
        navigate("/user/home");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-background-page flex items-center justify-center p-4 ">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl w-full">
        <div className="flex flex-col lg:flex-row">
          <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 relative">
            <img
              src="/images/register.png"
              alt="Register"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-black">
                  Welcome
                </h1>
                <p className="text-lg lg:text-xl opacity-90 text-black">
                  Join us and start your journey
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Create New Account
                </h2>
                <p className="text-gray-600">
                  Enter your details to create a new account
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      label="First Name"
                      id="first_name"
                      errors={errors.first_name}
                      field={field}
                    />
                  )}
                />

                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      label="Last Name"
                      id="last_name"
                      errors={errors.last_name}
                      field={field}
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      label="Email"
                      id="email"
                      errors={errors.email}
                      field={field}
                      inputType="email"
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      label="Password"
                      id="password"
                      errors={errors.password}
                      field={field}
                      inputType="password"
                    />
                  )}
                />

                <Controller
                  name="confirm_password"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      label="Confirm Password"
                      id="confirm_password"
                      errors={errors.confirm_password}
                      field={field}
                      inputType="password"
                    />
                  )}
                />

                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      headLabel="Role"
                      label="Select Role"
                      options={[
                        { label: "Admin", value: "admin" },
                        { label: "Staff", value: "staff" },
                        { label: "User", value: "user" },
                      ]}
                      onSelect={(value) => field.onChange(value)}
                      value={field.value}
                      error={{ message: errors.role?.message || "" }}
                      required
                    />
                  )}
                />
                {watch("role") === "staff" && (
                  <Controller
                    name="admin_id"
                    control={control}
                    render={({ field }) => (
                      <Dropdown
                        headLabel="Company"
                        label="Select Company"
                        options={adminsOptions}
                        onSelect={(value) => field.onChange(Number(value))}
                        value={field.value}
                        error={{ message: errors.admin_id?.message || "" }}
                        required
                      />
                    )}
                  />
                )}
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Button
                    onClick={() => navigate("/auth/login")}
                    className="w-full"
                  >
                    Log in
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
