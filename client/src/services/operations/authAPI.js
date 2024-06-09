import { authEndpoints } from "../APIs";
import { apiConnector } from "../apiConnector";
import { setProgress } from "../../slices/loadingBarSlice";
import { setToken, removeToken } from "../../slices/authSlice";
import { setUser, removeUser } from "../../slices/userSlice";
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

    // set Token
    dispatch(setToken(response.data?.data?.token));

    // set User
    dispatch(setUser(response?.data?.data?.user));

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
    toast.success(response.data?.message, {
      style: {
        border: "1px solid #5252B7",
        padding: "8px 16px",
        color: "#DFE2E2",
        background: "#5252B7",
      },
      iconTheme: {
        primary: "#5252B7",
        secondary: "#DFE2E2",
      },
    });
  } catch (e) {
    console.log("RESET_PASSWORD_TOKEN_API_ERROR : ", e);
    toast.success(e.response?.data?.message, {
      style: {
        border: "1px solid #5252B7",
        padding: "8px 16px",
        color: "#DFE2E2",
        background: "#5252B7",
      },
      iconTheme: {
        primary: "#5252B7",
        secondary: "#DFE2E2",
      },
    });
  }
  dispatch(setProgress(100));
};

export const resetPassword = async (data, token, dispatch) => {
  dispatch(setProgress(60));
  try {
    const response = await apiConnector(
      "PUT",
      RESET_PASSWORD_API + token,
      data
    );

    if (!response.data.success) {
      throw new Error(response.data?.data?.message);
    }

    dispatch(setProgress(100));
    console.log("SIGNUP_API_RESPONSE : ", response.data);
    toast.success(response.data?.message, {
      style: {
        border: "1px solid #5252B7",
        padding: "8px 16px",
        color: "#DFE2E2",
        background: "#5252B7",
      },
      iconTheme: {
        primary: "#5252B7",
        secondary: "#DFE2E2",
      },
    });
    return true;
  } catch (e) {
    console.log("RESET_PASSWORD_TOKEN_API_ERROR : ", e);
    toast.error(e.response?.data?.message, {
      style: {
        border: "1px solid #5252B7",
        padding: "8px 16px",
        color: "#DFE2E2",
        background: "#5252B7",
      },
      iconTheme: {
        primary: "#5252B7",
        secondary: "#DFE2E2",
      },
    });
  }
  dispatch(setProgress(100));
  return false;
};

export function logout(navigate) {
  return (dispatch) => {
    dispatch(removeToken());
    dispatch(removeUser());
    toast.success("Log out Successfull", {
      style: {
        border: "1px solid #5252B7",
        padding: "8px 16px",
        color: "#DFE2E2",
        background: "#5252B7",
      },
      iconTheme: {
        primary: "#5252B7",
        secondary: "#DFE2E2",
      },
    });
  };
}
