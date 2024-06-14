import { BadRequestError, DuplicateError, InternalServerError, InvalidError, NotFoundError } from "../../lib/appError.js";
import appResponse from "../../lib/appResponse.js";
import {
  forgotPassword,
  loginUser,
  resendOtp,
  resetPassword,
  signUpUser,
  userOtpVerifcation,
} from "../../services/authentication/authServices.js";

export const signUpHandler = async (req, res,next) => {
  const { body } = req;
  const {username,email,password} = body;
  if (!username || !email || !password) {
    return next(new BadRequestError("Fill all fields"));
  }
  try {
  const user = await signUpUser({ body });
  res.send(appResponse("new user onboarded successfully", user));
console.log(user);
  } catch (error) {
    console.log(error);

      if (error instanceof NotFoundError || error instanceof InvalidError) {
        res.status(400).json({ success: false, message: error.message });
      } else if (error instanceof DuplicateError) {
        res.status(409).json({ success: false, message: error.message });
      } else {
        next(new InternalServerError("Internal Server Error"), error);
      }
  }

};

export const verifyOtpHandler = async (req, res,next) => {
  const { body } = req;
  const { email } = req.query;
if(!email){
  return next(new BadRequestError("pass the email query please"));
}
try {
  const verifyUser = await userOtpVerifcation({ body, email });
  res.send(
    appResponse(`User OTP verified succefully, you can now log in`, verifyUser)
  );
} catch (error) {
  console.log(error)
  if (error instanceof NotFoundError || error instanceof InvalidError) {
    res.status(400).json({ success: false, message: error.message });
  } else if (error instanceof DuplicateError) {
    res.status(409).json({ success: false, message: error.message });
  } else {
    next(new InternalServerError("Internal Server Error"), error);
  }
}

};

export const LoginHandler = async (req, res,next) => {
  const { body } = req;

try {
  const loggedIn = await loginUser({ body });
  res.send(appResponse(`Logged in successfully`, loggedIn));
  
} catch (error) {
  console.log(error)
  if (error instanceof NotFoundError || error instanceof InvalidError) {
    res.status(400).json({ success: false, message: error.message });
  } else {
    next(new InternalServerError("Internal Server Error"), error);
  }
}};

export const forgotPasswordHandler = async (req, res,next) => {
  const { body } = req;
try {
  const updatePassword = await forgotPassword({ body });
  res.send(appResponse(`Reset Details successfully`, updatePassword));
} catch (error) {
  console.log(error)
  if (error instanceof NotFoundError || error instanceof InvalidError) {
    res.status(400).json({ success: false, message: error.message });
  } else {
    next(new InternalServerError("Internal Server Error"), error);
  }
}
};

export const resetPasswordHandler = async (req, res,next) => {
  const { email } = req.query;
  const { body } = req;
try{
  const updatePassword = await resetPassword({ email, body });
  res.send(appResponse(`Password RESETED successfully`, updatePassword));
}catch(error){
  console.log(error);
  if (error instanceof NotFoundError || error instanceof InvalidError) {
    res.status(400).json({ success: false, message: error.message });
  } else {
    next(new InternalServerError("Internal Server Error"), error);
  }
}
};

export const resendOtpHandler = async (req, res,next) => {
  const { body } = req;
try{
  const data = await resendOtp({ body });
  res.send(appResponse(`OTP resent successfully`, data));

}catch(error){
  console.log(error);
  next(new InternalServerError("Internal server Error"),error);
}

};
