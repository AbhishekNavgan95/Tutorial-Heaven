import { setProgress } from "../../slices/loadingBarSlice";
import { categoryEndpoints } from "../APIs";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
const { CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } = categoryEndpoints;

export const createCategory = async (data, token, dispatch) => {
  dispatch(setProgress(60));

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("thumbnail", data.thumbnail);

  try {
    const response = await apiConnector("POST", CREATE_CATEGORY, formData, {
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATE_CATEGORY_API_RESPONSE : ", response);
    if (!response.data?.success) {
      throw new Error(response.data?.message);
    }

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
    console.log("CREATE_CATEGORY_API_ERROR : ", error);
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
  } finally {
    dispatch(setProgress(100));
  }
  return false;
};

export const updateCategory = async (data, categoryId, token, dispatch) => {
  dispatch(setProgress(60));

  const fomrData = new FormData();
  fomrData.append("title", data.title);
  fomrData.append("description", data.description);
  fomrData.append("thumbnail", data.thumbnail);

  try {
    const res = await apiConnector(
      "PUT",
      `${UPDATE_CATEGORY}/${categoryId}`,
      fomrData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("UPDATE_CATEGORY_API_RESPONSE : ", res);
    if (!res.data?.success) {
      throw new Error(res.data?.message);
    }

    toast.success(res.data?.message, {
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
    console.log("UPDATE_CATEGORY_API_ERROR : ", error);
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
  } finally {
    dispatch(setProgress(100));
  }
  return false;
};

export const deleteCategory = async (categoryId, token, dispatch) => {
  dispatch(setProgress(60));

  try {
    const res = await apiConnector(
      "DELETE",
      `${DELETE_CATEGORY}/${categoryId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("DELETE_CATEGORY_API_RESPONSE : ", res);
    if (!res?.data?.success) {
      throw new Error(res?.data?.message);
    }

    toast.success(res?.data?.message, {
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
    console.log("DELETE_CATEGORY_API_ERROR : ", error);
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
  } finally {
    dispatch(setProgress(100));
  }
  return false;
};