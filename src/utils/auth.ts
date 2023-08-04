import { RegisterInput } from "models/auth.model";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const checkDuplicateUser = async (user: RegisterInput) => {
  const { email, userName } = user;
  const _user = await prisma?.user.findUnique({
    where: {
      email,
    },
  });
};

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
