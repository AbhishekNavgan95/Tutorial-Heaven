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