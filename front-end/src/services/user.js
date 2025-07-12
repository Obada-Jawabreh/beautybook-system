import APIService from "./api";

const baseURL = "/user";

export const GETallAdmin = async () => {
  const response = await APIService.fetchData({
    url: `${baseURL}/all-admin`,
    method: "GET",
  });
  return response;
};

export const GETCenterData = async (centerId) => {
  const response = await APIService.fetchData({
    url: `${baseURL}/center/${centerId}`,
    method: "GET",
  });
  return response;
};
export const GETstaffDetails = async (staffId) => {
  const response = await APIService.fetchData({
    url: `${baseURL}/staff-details/${staffId}`,
    method: "GET",
  });
  return response;
};

export const POSTbooking = async (data) => {
  const response = await APIService.fetchData({
    url: `${baseURL}/add-booking`,
    method: "POST",
    data,
  });
  return response;
};
export const GETmyBooking = async () => {
  const response = await APIService.fetchData({
    url: `${baseURL}/my-booking`,
    method: "GET",
  });
  return response;
};