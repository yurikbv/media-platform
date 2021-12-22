import {protectResolver} from "../../users/users.utils";
import prisma from "../../client";

export default {
  Mutation: {
    deleteComment: protectResolver(async (_, {id}, {loggedInUser}) => {
      const comment = await prisma.comment.findUnique({where: {id}, select: {userId: true}});
      if (!comment) {
        return {ok: false, error: "Comment not found"}
      } else if (comment.userId !== loggedInUser.id) {
        return {ok: false, error: "Not authorized."}
      } else {
        await prisma.comment.delete({where: {id}});
        return {ok: true}
      }
    })
  }
}