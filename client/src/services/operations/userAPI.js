import { apiConnector } from "../apiConnector";
import { setProgress } from "../../slices/loadingBarSlice";
import { setUser } from "../../slices/userSlice";
import toast from "react-hot-toast";
import { userEndpoints } from "../APIs";

const { UPDATE_PASSWORD, UPDATE_PROFILE_PICTURE, UPDATE_USERNAME } =
  userEndpoints;

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
    return true
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
  return false
};
