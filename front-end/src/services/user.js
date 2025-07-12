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
