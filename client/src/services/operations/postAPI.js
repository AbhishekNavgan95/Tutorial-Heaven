import { postEndpoints } from "../APIs";
import { apiConnector } from "../apiConnector";
import { setProgress } from "../../slices/loadingBarSlice";
import { setUser, removeUser } from "../../slices/userSlice";
import toast from "react-hot-toast";

const { CREATE_POST } = postEndpoints;

export const createPost = async (data, dispatch, token) => {
  
  dispatch(setProgress(60));

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
