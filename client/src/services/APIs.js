const BASE_URL = import.meta.env.VITE_BASE_URL;

export const authEndpoints = {
    LOGIN_API: BASE_URL + "auth/login",
    SIGNUP_API: BASE_URL + "auth/signup",
    SEND_OTP_API: BASE_URL + "auth/send-otp",
    SEND_RESET_PASSWORD_TOKEN_API: BASE_URL + "auth/reset-password-token",
    RESET_PASSWORD_API: BASE_URL + "auth/reset-password/"
}

export const dataEndpoints = {
    GET_ALL_CATEGORIES: BASE_URL + "category/get-all-categories",
    GET_ALL_POSTS: BASE_URL + "post/get-all-posts",
    GET_ALL_CATEGORY_POSTS : BASE_URL + "post/get-all-category-posts"
}

export const userEndpoints = {
    UPDATE_PROFILE_PICTURE: BASE_URL + "auth/update-pfp",
    UPDATE_USERNAME: BASE_URL + "auth/update-username",
    UPDATE_PASSWORD: BASE_URL + "auth/update-password",
    SCHEDULE_DELETE_ACCOUNT : BASE_URL + "auth/delete-account",
    GET_ALL_USER_POSTS: BASE_URL + "auth/user-posts",
    GET_USER_SAVED_POSTS: BASE_URL + "auth/saved-posts",
    SAVE_POST: BASE_URL + "auth/save-post",
    UNSAVE_POST: BASE_URL + "auth/unsave-post",
    LIKE_POST: BASE_URL + "post/like-post",
    UNLIKE_POST: BASE_URL + "post/unlike-post",
    CHANGE_POST_STATUS: BASE_URL + "post/update-poststatus"
}

export const postEndpoints = {
    CREATE_POST: BASE_URL + "post/create-post",
    UPDATE_POST: BASE_URL + "post/update-post",
    DELETE_POST: BASE_URL + "post/delete-post",
    GET_POST: BASE_URL + "post/get-full-post-details",
    GET_POST_COMMENTS: BASE_URL + "comment/get-post-comments",
    CREATE_COMMENT: BASE_URL + "comment/add-comment",
    DELETE_COMMENT: BASE_URL + "comment/delete-comment",
    LIKE_COMMENT: BASE_URL + "comment/like-comment",
    UNLIKE_COMMENT: BASE_URL + "comment/unlike-comment",
}