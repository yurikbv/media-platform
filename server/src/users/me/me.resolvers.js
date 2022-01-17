import {protectResolver} from "../users.utils";
import prisma from "../../client";

export default {
  Query: {
    me: protectResolver(async (_, __, { loggedInUser }) => {
      return await prisma.user.findUnique({where: { id: loggedInUser.id }})
    })
  }
}