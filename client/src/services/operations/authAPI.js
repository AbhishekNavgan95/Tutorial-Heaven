import { authEndpoints } from "../APIs";
import { apiConnector } from "../apiConnector";
import { setProgress } from "../../slices/loadingBarSlice";
import { setToken } from "../../slices/authSlice";
import toast from "react-hot-toast";

const {
  LOGIN_API,
  SEND_OTP_API,
  SIGNUP_API,
  SEND_RESET_PASSWORD_TOKEN_API,
  RESET_PASSWORD_API,
} = authEndpoints;

export const login = async (email, password, dispatch) => {
  dispatch(setProgress(60));
  try {
    const response = await apiConnector("POST", LOGIN_API, {
      email,
      password,
    });

    console.log("LOGIN_API_RESPONSE : ", response);
    dispatch(setProgress(100));
    if (!response.data.success) {
      throw new Error("request failed : ", response.data.message);
    }

    dispatch(setToken(response.data?.data?.token));
    return true;
  } catch (e) {
    console.log("LOGIN_API_ERROR : ", e);
  }
  return false;
};

export const sendOtp = async (data, dispatch) => {
  dispatch(setProgress(60));
  const { email } = data;
  try {
    const response = await apiConnector("POST", SEND_OTP_API, { email });

    if (!response.data.success) {
      throw new Error("request failed : ", response.data?.message);
    }
    dispatch(setProgress(100));

    console.log("SEND_OTP_API_RESPONSE : ", response.data);
    return true;
  } catch (e) {
    console.log("SEND_OTP_API_ERROR: ", e);
  }
  return false;
};

export const signup = async (data, dispatch) => {
  dispatch(setProgress(60));
  try {
    const response = await apiConnector("POST", SIGNUP_API, data);

    if (!response.data.success) {
      throw new Error("request failed : ", response.data?.message);
    }

    dispatch(setProgress(100));
    console.log("SIGNUP_API_RESPONSE : ", response.data);
    return true;
  } catch (e) {
    console.log("SIGNUP_API_ERROR: ", e);
  }
  return false;
};

export const resetPasswordToken = async (data, dispatch) => {
  dispatch(setProgress(60));
  try {
    const response = await apiConnector(
      "POST",
      SEND_RESET_PASSWORD_TOKEN_API,
      data
    );

    if (!response.data.success) {
      throw new Error(response.data?.data?.message);
    }

    dispatch(setProgress(100));
    console.log("SIGNUP_API_RESPONSE : ", response.data);
    toast.success(response.data?.message);
  } catch (e) {
    console.log("RESET_PASSWORD_TOKEN_API_ERROR : ", e);
    toast.error(e.response?.data?.message);
  }
  dispatch(setProgress(100));
};

export const resetPassword = async (data, token, dispatch) => {
  dispatch(setProgress(60));
  try {
    const response = await apiConnector("PUT", RESET_PASSWORD_API + token, data);

    if (!response.data.success) {
      throw new Error(response.data?.data?.message);
    }

    dispatch(setProgress(100));
    console.log("SIGNUP_API_RESPONSE : ", response.data);
    toast.success(response.data?.message);
    return true;
  } catch (e) {
    console.log("RESET_PASSWORD_TOKEN_API_ERROR : ", e);
    toast.error(e.response?.data?.message);
  }
  dispatch(setProgress(100));
  return false;
};
