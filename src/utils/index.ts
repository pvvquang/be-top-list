import { RegisterInput } from "models/auth.model";

const checkDuplicateUser = async (user: RegisterInput) => {
  const { email, userName } = user;
  const _user = await prisma?.user.findUnique({
    where: {
      email,
    },
  });
};
