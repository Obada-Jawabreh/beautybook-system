import axios from "axios";
class APIService {
  init() {
    this.baseApi = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });

    this.baseApi.interceptors.request.use(
      async (config) => {
        const accessToken = await localStorage.getItem("token");
        if (accessToken) {
          config.headers["Authorization"] = `${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.baseApi.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  fetchData(param = {}) {
    return new Promise((resolve, reject) => {
      this.baseApi(param)
        .then((response) => {
          resolve(response.data);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  }
}
export default new APIService();
