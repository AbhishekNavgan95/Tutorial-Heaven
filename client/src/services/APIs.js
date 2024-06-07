const BASE_URL = import.meta.env.VITE_BASE_URL;

export const authEndpoints = {
    LOGIN_API: BASE_URL + "auth/login",
    SIGNUP_API: BASE_URL + "auth/signup",
    SEND_OTP_API: BASE_URL + "auth/send-otp",
    SEND_RESET_PASSWORD_TOKEN_API: BASE_URL + "auth/reset-password-token",
    RESET_PASSWORD_API: BASE_URL + "auth/reset-password/"
}