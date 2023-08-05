import { RegisterInput } from "models/auth.model";
import bcrypt from "bcrypt";
import { AppError, HttpCode } from "models/http-exception.model";

const saltRounds = 10;

export const checkDuplicateUser = async (user: RegisterInput) => {
  const { email } = user;
  const _user = await prisma?.user.findUnique({
    where: {
      email,
    },
  });
  if (_user) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      message: "Email had existed. Please enter another email!",
    });
  }
};

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
