import bcrypt from 'bcrypt';
import prisma from "../../client";
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      // find user by args.username
      const user = await prisma.user.findFirst({where: {username}});
      if (!user) return {
        ok: false,
        error: "User not found"
      }
      // check password with args.password
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) return {
        ok: false,
        error: "Incorrect password."
      }
      // issue a token and send it to the user
      const token = jwt.sign({id: user.id}, process.env.SECRET_KEY);
      return {
        ok: true,
        token
      }
    }
  }
}