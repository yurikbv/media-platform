import {protectResolver} from "../../users/users.utils";
import prisma from "../../client";

export default {
  Mutation: {
    toggleLike: protectResolver(async (_, {id}, {loggedInUser}) => {
      const photo = await prisma.photo.findUnique({where: {id}});
      if (!photo) return { ok: false, error: 'Photo not found/' }
      const likeWhere = {photoId_userId: { userId: loggedInUser.id, photoId: id }}
      const like = await prisma.like.findUnique({where: likeWhere});
      if (like) {
        prisma.like.delete({where: likeWhere})
      } else {
        prisma.like.create({data: {user: { connect: { id: loggedInUser.id } }, photo: { connect: { id: photo.id } }}})
      }
      return { ok: true }
    })
  }
}