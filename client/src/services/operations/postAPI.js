import { postEndpoints } from "../APIs";
import { apiConnector } from "../apiConnector";
import { setProgress } from "../../slices/loadingBarSlice";
import { setUser, removeUser } from "../../slices/userSlice";
import toast from "react-hot-toast";

const { CREATE_POST, UPDATE_POST, DELETE_POST, CREATE_COMMENT } = postEndpoints;

export const createPost = async (data, dispatch, token) => {
  dispatch(setProgress(60));

  if (Array.isArray(data.tags)) {
    data.tags = data.tags?.join(",");
  }

  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  try {
    const response = await apiConnector(
      "POST",
      CREATE_POST,
      formData,
      {
        Authorization: `Bearer ${token}`,
      },
      null,
      (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log("progress : ", progress);
        dispatch(setProgress(progress));
      }
    );

    console.log("CREATE_POST_API_RESPONSE: ", response);

    if (!response.data?.success) {
      throw new Error(response.data?.message);
    }

    dispatch(setUser(response.data?.data));
    dispatch(setProgress(100));
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
  } catch (error) {
    console.log("CREATE_POST_API_ERRO: ", error);
    toast.error(error?.response?.data?.message, {
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
  // dispatch(setProgress(100));
  return false;
};

export const updatePost = async (data, postId, dispatch, token) => {
  if (Array.isArray(data.tags)) {
    data.tags = data.tags?.join(",");
  }

  dispatch(setProgress(60));

  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  try {
    const response = await apiConnector(
      "PUT",
      `${UPDATE_POST}/${postId}`,
      data,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    );

    console.log("UPDATE_POST_API_RESPONSE : ", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    dispatch(setUser(response?.data?.data));
    dispatch(setProgress(100));
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
    console.log("UPDATE_POST_API_ERROR : ", e);
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

export const deletePost = async (postId, dispatch, token) => {
  dispatch(setProgress(60));

  try {
    const response = await apiConnector(
      "DELETE",
      `${DELETE_POST}/${postId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("DELETE_POST_API_RESPONSE : ", response);

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
    console.log("DELETE_POST_API_ERROR : ", e);
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

export const addComment = async (data, postId, dispatch, token) => {
  dispatch(setProgress(60));

  try {
    const response = await apiConnector(
      "POST",
      `${CREATE_COMMENT}/${postId}`,
      { description: data?.comment },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("ADD_COMMENT_API_RESPONSE : ", response);

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
    return response?.data?.data;
  } catch (e) {
    console.log("ADD_COMMENT_API_ERROR : ", e);
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
