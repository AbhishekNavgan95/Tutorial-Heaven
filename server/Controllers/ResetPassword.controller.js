const User = require("../Models/User.model");
const crypto = require("crypto");
const mailSender = require("../Utils/mailSender");
const ResetPasswordTamplate = require("../EmailTamplates/ResetPasswordTamplate");
const PasswordReset = require("../EmailTamplates/PasswordResetTamplate")
const bcrypt = require("bcrypt");

// reset password token ✅
exports.resetPasswordToken = async (req, res) => {
  try {
    // Get email from request body
    const { email } = req.body;

    // Check if user exists for this email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "This email is not registered with us",
      });
    }

    // Generate a unique token
    const token = crypto.randomBytes(32).toString("hex");

    // Update user with token and current time for expiration
    user.token = token;
    user.clearTokenAfterOneHour();
    await user.save();

    // Create password reset URL
    const resetUrl = `${process.env.CORS_ORIGIN}/reset-password?token=${token}`;

    // Compose email message
    const emailBody = ResetPasswordTamplate(resetUrl);

    // Send email with password reset link
    await mailSender(user.email, "Password Reset", emailBody);

    return res.status(200).json({
      success: true,
      message: "Email sent to your registered email",
      data: {
        token
      }
    });
  } catch (error) {
    console.error("Error sending password reset link:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending the password reset link",
    });
  }
};

// reset password ✅
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;

    // Validate password and confirmPassword
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Find user by token
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and remove token
    user.password = hashedPassword;
    user.token = undefined;
    await user.save();

    const emailBody = PasswordReset();
    await mailSender(user.email, "Password Reset", emailBody);
    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while resetting the password",
      error: error.message,
    });
  }
};
