import { postEndpoints } from "../APIs";
import { setProgress } from "../../slices/loadingBarSlice";
import { setUser } from "../../slices/userSlice";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";

const { LIKE_COMMENT, UNLIKE_COMMENT, DELETE_COMMENT } = postEndpoints;

export const likeComment = async (commentId, dispatch, token) => {
  dispatch(setProgress(60));

  try {
    const response = await apiConnector(
      "PUT",
      LIKE_COMMENT + "/" + commentId,
      null,
      {
        Authorization: "Bearer " + token,
      }
    );

    console.log("LIKE_COMMENT_API_RESPONSE : ", response);

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
    console.log("LIKE_COMMENT_API_ERROR : ", e);
    toast.success(e?.response?.data?.message, {
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

export const unlikeComment = async (commentId, dispatch, token) => {
  dispatch(setProgress(60));

  try {
    const response = await apiConnector(
      "PUT",
      UNLIKE_COMMENT + "/" + commentId,
      null,
      {
        Authorization: "Bearer " + token,
      }
    );

    console.log("UNLIKE_COMMENT_API_RESPONSE : ", response);

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
    console.log("UNLIKE_COMMENT_API_ERROR : ", e);
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
  return true;
};

export const deleteComment = async (commentId, dispatch, token) => {
  dispatch(setProgress(60));

  try {
    const response = await apiConnector(
      "DELETE",
      `${DELETE_COMMENT}/${commentId}`,
      null,
      {
        Authorization: "Bearer " + token,
      }
    );

    console.log("DELETE_COMMENT_API_RESPONSE : ", response);

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
    console.log("DELETE_COMMENT_API_ERROR : ", e);
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
};
