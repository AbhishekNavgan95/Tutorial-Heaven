import { apiConnector } from "../apiConnector";
import { setProgress } from "../../slices/loadingBarSlice";
import { setUser } from "../../slices/userSlice";
import toast from "react-hot-toast";
import { userEndpoints } from "../APIs";
import { logout } from "../operations/authAPI";

const {
  UPDATE_PASSWORD,
  UPDATE_PROFILE_PICTURE,
  UPDATE_USERNAME,
  SCHEDULE_DELETE_ACCOUNT,
  SAVE_POST,
  UNSAVE_POST,
  LIKE_POST,
  UNLIKE_POST,
  CHANGE_POST_STATUS,
} = userEndpoints;

export const updateProfilePicture = async (file, token, dispatch) => {
  try {
    if (!file) {
      toast("Please Select an Image", {
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
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const response = await apiConnector(
      "PUT",
      UPDATE_PROFILE_PICTURE,
      formData,
      { Authorization: `Bearer ${token}` },
      null,
      (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        dispatch(setProgress(progress));
      }
    );

    console.log("UPDATE_PROFILE_PICTURE_API_RESPONSE : ", response);

    if (!response.data?.success) {
      throw new Error(response?.data?.data?.message);
    }

    dispatch(setUser(response?.data?.data));
    toast.success(response?.data?.message, {
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
    console.log("UPDATE_PROFILE_PICTURE_API_RESPONSE : ", e);
    toast.error(e?.response?.data?.message, {
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
  return false;
};

export const updateUserName = async (data, token, dispatch) => {
  dispatch(setProgress(60));
  try {
    const response = await apiConnector("PUT", UPDATE_USERNAME, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("UPDATE_USERNAME_API_RESPONSE : ", response);

    if (!response.data?.success) {
      throw new Error(response.data?.message);
    }

    dispatch(setUser(response.data?.data));

    toast.success(response?.data?.message, {
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
    console.log("UPDATE_USERNAME_API_ERROR : ", e);
    toast(e?.response?.data?.message, {
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
  } finally {
    dispatch(setProgress(100));
  }
  return false;
};

export const updatePassword = async (data, token, dispatch) => {
  setProgress(60);
  try {
    const response = await apiConnector("PUT", UPDATE_PASSWORD, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("UPDATE_PASSWORD_API_RESPONSE : ", response);

    if (!response.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success(response?.data?.message, {
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
    console.log("UPDATE_PASSWORD_API_ERROR : ", e);
    toast(e?.response?.data?.message, {
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
  } finally {
    dispatch(setProgress(100));
  }
  return false;
};

export const deleteAccount = async (token, dispatch, navigate) => {
  setProgress(60);
  try {
    const response = await apiConnector("PUT", SCHEDULE_DELETE_ACCOUNT, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("SCHEDULE_ACCOUNT_DELETE_API_RESPONSE : ", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success(response?.data?.message, {
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

    dispatch(logout(navigate));
    return true;
  } catch (e) {
    console.log("SCHEDULE_ACCOUNT_DELETION_ERROR : ", e);
    toast(e?.response?.data?.message, {
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
  } finally {
    setProgress(100);
  }
  return false;
};

export const savePost = async (token, dispatch, postId) => {
  try {
    const response = await apiConnector("PUT", `${SAVE_POST}/${postId}`, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("SAVE_POST_API_RESPONSE : ", response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    dispatch(setUser(response?.data?.data));
    toast.success(response?.data?.message, {
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
    console.log("SAVE_POST_API_ERROR : ", e);
    toast.error(e?.response?.data?.message, {
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
  return false;
};

export const unSavePost = async (token, dispatch, postId) => {
  try {
    const response = await apiConnector(
      "PUT",
      `${UNSAVE_POST}/${postId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    dispatch(setUser(response?.data?.data));
    toast.success(response?.data?.message, {
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
    console.log("UNSAVE_POST_API_ERROR : ", e);
    toast.error(e?.response?.data?.message, {
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
  return false;
};

export const changePostStatus = async (status, token, postId, dispatch) => {
  dispatch(setProgress(60));

  try {
    const response = await apiConnector(
      "PUT",
      `${CHANGE_POST_STATUS}/${postId}`,
      { status: status },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success(response?.data?.message, {
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
    console.log("ARCHIVE_POST_API_ERROR : ", e);
    toast.error(e?.response?.data?.message, {
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
  } finally {
    dispatch(setProgress(100));
  }
  return false;
};

export const likePost = async (token, dispatch, postId) => {
  try {
    const response = await apiConnector("PUT", `${LIKE_POST}/${postId}`, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("LIKE_POST_API_RESPONSE : ", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    dispatch(setUser(response?.data?.data));
    toast.success(response?.data?.message, {
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
    console.log("LIKE_POST_API_ERROR : ", e);
    toast.error(e?.response?.data?.message, {
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
  return false;
};

export const unlikePost = async (token, dispatch, postId) => {
  try {
    const response = await apiConnector(
      "PUT",
      `${UNLIKE_POST}/${postId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("UNLIKE_POST_API_RESPONSE : ", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    dispatch(setUser(response?.data?.data));
    toast.success(response?.data?.message, {
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
    console.log("UNLIKE_POST_API_ERROR : ", e);
    toast.error(e?.response?.data?.message, {
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
  return false;
};
