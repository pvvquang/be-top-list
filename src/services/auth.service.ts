import { handleEmptyKeyObject } from "utils";
import { hashPassword } from "utils/auth";
import { RegisterInput } from "../models/auth.model";

export const createUser = async (user: RegisterInput) => {
  if (handleEmptyKeyObject(user)) return;
  const newPassword = hashPassword(user.password);
  const _user = await prisma?.user.create({
    data: {
      email: user.email,
      userName: user.userName,
      password: newPassword,
    },
  });
  return _user;
};
