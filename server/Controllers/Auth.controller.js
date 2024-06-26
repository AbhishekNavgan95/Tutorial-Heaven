const otpGenerator = require("otp-generator");
const User = require("../Models/User.model");
const ModeratorToken = require("../Models/ModeratorToken.model");
const mailSender = require("../Utils/mailSender");
const Otp = require("../Models/Otp.model");
const otpTamplate = require("../EmailTamplates/OtpTamplate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

// SEND OTP ✅
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email is required",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    try {
      const tamplate = otpTamplate(email, otp);

      const mailResponse = await mailSender(
        email,
        "Email Varification",
        tamplate
      );
    } catch (e) {
      console.log("error occurred while sending the email");
      throw e;
    }

    const Createdotp = await Otp.create({
      email: email,
      otp: otp,
    });

    res.status(200).json({
      success: true,
      message: "Otp sent successfully",
      data: Createdotp,
    });
  } catch (e) {
    console.log("error while sending otp ", e);
  }
};

// SIGN UP ✅
exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType = "user",
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !accountType ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "All feilds are required!",
      });
    }

    if (accountType !== "user") {
      return res.status(400).json({
        success: false,
        message: "Invalid account type",
      });
    }

    // password validation
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // validating details
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    const recentOtp = await Otp.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    // validating otp
    if (!recentOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (recentOtp?.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is invalid",
      });
    }

    // create new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      image: {
        url: `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        public_id: null,
      },
    });

    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (e) {
    console.log("something went wrong while creating new user ", e);
    res.status(500).json({
      success: false,
      message: "User cannot be registered at this momment, please try later",
    });
  }
};

// LOG IN ✅
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate data
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ email: email });

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User is not registered, please Sign up",
      });
    }

    if(userExists?.deletionScheduled === true) {
      console.log("tried to login")
      return res.status(400).json({
        success: false,
        message: "This account is scheduled for deletion"
      })
    }

    const user = userExists.toObject(); // to make object mutable
    console.log("user : ", user);

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      user.token = token;
      user.password = undefined;

      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        data: {
          token,
          user,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "password is incorrect!",
      });
    }
  } catch (e) {
    console.log("error occurred while loggin in ", e);
    res.status(500).json({
      success: false,
      message: "Login failed, please try again",
    });
  }
};

//  update password✅
exports.updatePassword = async (req, res) => {
  try {
    // recieve data such as, old password, new password, confirm new password
    const { oldPassword, newPassword, confirmPassword } = req.body;
    // recieve user id from req.user
    const userId = req.user.id;

    // validate data
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All feilds are required",
      });
    }

    // validate new password and confirm password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password do not match",
      });
    }

    // check user exist
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // validate user passsword if true
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: await bcrypt.hash(newPassword, 10) },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the password",
    });
  }
};

// schedule account deletion ✅
exports.scheduleAccountDeletion = async (req, res) => {
  const userId = req.user.id;
  const deletionDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        deletionScheduled: true,
        deletionDate: deletionDate,
      },
      { new: true }
    );

    // todo send am email to user for support

    if (user) {
      console.log(
        `Account deletion scheduled for user ${userId} at ${deletionDate}`
      );
      res.status(200).json({
        success: true,
        message: `Account will be deleted after 30 days!`,
      });
    } else {
      console.error(`User ${userId} not found.`);
      res.status(404).json({
        success: false,
        message: `User not found`,
      });
    }
  } catch (err) {
    console.error("Error scheduling account deletion:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the account",
    });
  }
};

// Cancel scheduled deletion ✅
exports.cancelScheduledDeletion = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (user && user.deletionScheduled) {
      user.deletionScheduled = false;
      user.deletionDate = undefined;
      await user.save();

      console.log(`Scheduled deletion for user ${userId} has been canceled.`);
      res.status(200).json({
        success: true,
        message: "Account deletion cancelled successfully",
      });
    } else {
      console.log(`No scheduled deletion found for user ${userId}.`);
      res.status(404).json({
        success: false,
        message: "No scheduled deletion found.",
      });
    }
  } catch (err) {
    console.error("Error canceling scheduled account deletion:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// generate moderator account token ✅
exports.generateModeratorToken = async (req, res) => {
  try {
    const { email } = req.body;
    const token = crypto.randomBytes(32).toString("hex");

    const createdToken = await ModeratorToken.create({ email, token });

    await mailSender(
      email,
      "Moderator Account Token",
      `Use this token to create a moderator account: ${token}`
    );

    res.status(200).json({
      success: true,
      message: "Token generated and sent to email",
      data: createdToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while generating moderator token",
    });
  }
};

// create moderator account ✅
exports.createModeratorAccount = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, token } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !token
    ) {
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

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exist",
      });
    }

    const tokenDocument = await ModeratorToken.findOne({
      token: token,
      email: email,
    });
    if (!tokenDocument) {
      return res.status(400).json({
        sucess: false,
        message: "invalid or expired token",
      });
    }

    // create new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newModerator = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType: "moderator",
      image: {
        url: `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        public_id: null,
      },
    });

    await newModerator.save();
    await ModeratorToken.findByIdAndDelete(tokenDocument._id);

    res.status(200).json({
      success: true,
      message: "Moderator Account created Successfully",
      data: newModerator,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating Moderator Account",
    });
  }
};

// create admin account ✅
exports.createAdminAccount = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, secret } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !secret
    ) {
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

    if (secret !== process.env.ADMIN_SECRET) {
      return res.status(400).json({
        success: false,
        message: "secret is incorrect",
      });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType: "admin",
      image: {
        url: `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        public_id: null,
      },
    });

    await newAdmin.save();

    res.status(200).json({
      success: true,
      message: "Admin Account created Successfully",
      data: newAdmin,
    });

  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating Admin Account",
    });
  }
};