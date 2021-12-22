import {protectResolver} from "../../users/users.utils";
import prisma from "../../client";

export default {
  Mutation: {
    deletePhoto: protectResolver(async (_, {id}, {loggedInUser}) => {
      const photo = await prisma.photo.findUnique({where: {id}, select: {userId: true}});
      if (!photo) {
        return {ok: false, error: "Photo not found"}
      } else if (photo.userId !== loggedInUser.id) {
        return {ok: false, error: "Not authorized."}
      } else {
        await prisma.photo.delete({where: {id}});
        return {ok: true}
      }
    })
  }
}