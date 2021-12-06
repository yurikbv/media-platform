import prisma from "../../client";
import bcrypt from "bcrypt";
import {protectResolver} from "../users.utils";

const resolverFn = async (_, {firstName, lastName, username, email, password}, {loggedInUser}) => {
  let hashedPassword = null;
  if (password) hashedPassword = await bcrypt.hash(password, 10);
  const updatedUser = await prisma.user.update({where: {id: loggedInUser.id}, data: {firstName, lastName, username, email,
      ...(hashedPassword && { password: hashedPassword })}});
  if (updatedUser.id) {
    return {ok: true}
  } else return { ok: false, error: 'Could not update profile' }
}

export default {
  Mutation: {
    editProfile: protectResolver(resolverFn)
  }
}