import APIService from "./api";

const baseURL = "/admin";

// ✅ Add Service
export const POSTservice = async (data) => {
  const response = await APIService.fetchData({
    url: `${baseURL}/add-service`,
    method: "POST",
    data,
  });
  return response;
};

// ✅ Update Service
export const PUTservice = async (id, data) => {
  const response = await APIService.fetchData({
    url: `${baseURL}/update-service/${id}`,
    method: "PUT",
    data,
  });
  return response;
};

// ✅ Delete Service
export const DELETEservice = async (id) => {
  const response = await APIService.fetchData({
    url: `${baseURL}/delete-service/${id}`,
    method: "DELETE",
  });
  return response;
};

// ✅ Get Services and Staff
export const GETservicesAndStaff = async () => {
  const response = await APIService.fetchData({
    url: `${baseURL}/all-services-staff`,
    method: "GET",
  });
  return response;
};


// ✅ Update Staff Status (approved/rejected)
export const PUTUpdateStaffStatus = async (id, status) => {
  const response = await APIService.fetchData({
    url: `${baseURL}/update-staff-status/${id}`,
    method: "PUT",
    data: { status },
  });
  return response;
};

// ✅ Get All Staff
export const GETAllStaff = async () => {
  const response = await APIService.fetchData({
    url: `${baseURL}/all-staff`,
    method: "GET",
  });
  return response;
};
