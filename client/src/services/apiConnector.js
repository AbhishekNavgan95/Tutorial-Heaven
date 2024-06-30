import axios from "axios";
import { store } from "../main.jsx";
import { setTokens, removeTokens } from "../slices/authSlice.js";
import { authEndpoints } from "../services/APIs.js";

const { REFRESH_TOKEN_API } = authEndpoints;

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;
        console.log("Refreshing token using refresh token: ", refreshToken);

        const response = await axios.post(REFRESH_TOKEN_API, { refreshToken });
        console.log("Refresh token response:", response.data);

        if (response.data && response.data.accessToken) {
          const { accessToken } = response.data;
          store.dispatch(setTokens({ accessToken, refreshToken }));

          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } else {
          console.error(
            "Refresh token API did not return an access token:",
            response.data
          );
          store.dispatch(removeTokens());
          return Promise.reject(error);
        }
      } catch (err) {
        console.error("Error while refreshing token:", err);
        store.dispatch(removeTokens());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export const apiConnector = async (
  method,
  url,
  bodyData,
  headers,
  params,
  onDownloadProgress
) => {
  try {
    const response = await axiosInstance({
      method: method,
      url: url,
      data: bodyData ? bodyData : null,
      headers: headers ? headers : null,
      params: params ? params : null,
      onDownloadProgress: onDownloadProgress ? onDownloadProgress : null,
    });
    return response;
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error);
    throw error;
  }
};
