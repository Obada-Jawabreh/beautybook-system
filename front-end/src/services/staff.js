import APIService from "./api";

const baseURL = "/staff";

export const GETMyServices = async () => {
  const response = await APIService.fetchData({
    url: `${baseURL}/my-services`,
    method: "GET",
  });
  return response;
};

export const POSTaddAppointment = async (data) => {
  const response = await APIService.fetchData({
    url: `${baseURL}/add-appointment`,
    method: "POST",
    data,
  });
  return response;
};

// Get all appointments
export const GETAllAppointments = async () => {
  const response = await APIService.fetchData({
    url: `${baseURL}/get-appointments`,
    method: "GET",
  });
  return response;
};

// Update an appointment

export const PUTUpdateAppointment = async (id, data) => {
  const response = await APIService.fetchData({
    url: `${baseURL}/update-appointment/${id}`,
    method: "PUT",
    data: data,
  });
  return response;
};

// Delete an appointment
export const DELETEAppointment = async (id) => {
  const response = await APIService.fetchData({
    url: `${baseURL}/delete-appointment/${id}`,
    method: "DELETE",
  });
  return response;
};
