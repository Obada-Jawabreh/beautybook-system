import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "@/schema/shared";
import InputForm from "@/components/shared/inputs/InputForm";
import Button from "@/components/shared/inputs/Button";
import { toast } from "react-toastify";
import { useApi } from "@/hooks/useApi";
import { POSTlogin } from "@/services/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { request } = useApi(POSTlogin);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
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
      console.error("Login failed:", error);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-background-page flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-6xl w-full">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Form */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600">Enter your credentials to login</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <InputForm
                      label="Email"
                      id="email"
                      errors={errors.email}
                      field={field}
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

                <Button type="submit" className="w-full">
                  Login
                </Button>

                <p className="text-sm text-center text-gray-500 mt-4">
                  Forgot your password?{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Reset it here
                  </a>
                </p>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Button
                    onClick={() => navigate("/auth/register")}
                    className="w-full"
                  >
                    Register
                  </Button>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 relative">
            <img
              src="/images/register.png"
              alt="Login"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-black">
                  Hello Again!
                </h1>
                <p className="text-lg lg:text-xl opacity-90 text-black">
                  Log in and continue your journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
