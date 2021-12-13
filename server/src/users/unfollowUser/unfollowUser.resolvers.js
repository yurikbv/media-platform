import {protectResolver} from "../users.utils";
import prisma from "../../client";

export default {
  Mutation: {
    unfollowUser: protectResolver(async (_, {username}, {loggedInUser}) => {
      const toUnfollowUser = await prisma.user.findUnique({where: {username}});
      if (!toUnfollowUser) return { ok: false, error: 'Cannot unfollow user.' }
      await prisma.user.update({where: { id: loggedInUser.id }, data: { following: { disconnect: {username} } }});
      return { ok: true }
    })
  }
}