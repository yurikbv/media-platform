import {protectResolver} from "../users.utils";
import prisma from "../../client";

export default {
  Mutation: {
    followUser: protectResolver(async (_, { username }, { loggedInUser }) => {
      const toFollowUser = await prisma.user.findUnique({where: {username}});
      if (!toFollowUser) return { ok: false, error: 'That user does not exist.' }
      await prisma.user.update({where: {id: loggedInUser.id}, data: {following: {
        connect: { username }
      }}})
      return { ok: true }
    })
  }
}