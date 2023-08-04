import { AppError } from "models/http-exception.model";
import { RegisterInput } from "../models/auth.model";

export const createUser = async (user: RegisterInput) => {
  const { userName, email, password, fullName } = user;

  if (!userName) {
    throw new AppError({ httpCode: 400, message: "UserName is can't blank!" });
    return;
  }
  if (!email) {
    throw new AppError({ httpCode: 400, message: "Email is can't blank!" });
    return;
  }
  if (!fullName) {
    throw new AppError({ httpCode: 400, message: "FullName is can't blank!" });
    return;
  }
  if (!password) {
    throw new AppError({ httpCode: 400, message: "Password is can't blank!" });
    return;
  }

  
};
