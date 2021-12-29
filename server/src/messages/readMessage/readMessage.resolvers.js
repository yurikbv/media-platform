import {protectResolver} from "../../users/users.utils";
import prisma from "../../client";

export default {
  Mutation: {
    readMessage: protectResolver(async (_, {id}, { loggedInUser }) => {
      const message = await prisma.message.findFirst({
        where: { id, userId: { not: loggedInUser.id }, users: { some: {id: loggedInUser.id} } },
        select: {id: true}});
      if (!message) return {ok: false, error: "Message not found"}
      await prisma.message.update({where: {id}, data: { read: true }})
      return { ok: true }
    })
  }
}