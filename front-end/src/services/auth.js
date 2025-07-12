import APIService from "./api";

const baseURL = "/auth";

export const POSTregister = async (data) => {
  const response = await APIService.fetchData({
    url: `${baseURL}/register`,
    method: "POST",
    data,
  });
  return response;
};

export const POSTlogin = async (data) => {
  const response = await APIService.fetchData({
    url: `${baseURL}/login`,
    method: "POST",
    data,
  });
  return response;
};
export const GETadmins = async () => {
  const response = await APIService.fetchData({
    url: `${baseURL}/admins`,
    method: "GET",
  });
  return response;
};
