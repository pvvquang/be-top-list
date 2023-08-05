import { handleEmptyKeyObject } from "utils";
import { checkDuplicateUser, hashPassword } from "utils/auth";
import { RegisterInput } from "../models/auth.model";
import prisma from "configs/db";

export const createUser = async (user: RegisterInput) => {
  if (handleEmptyKeyObject(user)) return;
  await checkDuplicateUser(user);
  const newPassword = hashPassword(user.password);
  const _user = await prisma.user.create({
    data: {
      email: user.email,
      userName: user.userName,
      password: newPassword,
    },
  });
  return _user;
};
