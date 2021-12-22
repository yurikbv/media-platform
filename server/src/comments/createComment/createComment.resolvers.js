import {protectResolver} from "../../users/users.utils";
import prisma from "../../client";

export default {
  Mutation: {
    createComment: protectResolver(async (_, {photoId, payload}, {loggedInUser}) => {
      const photoExists = await prisma.photo.findUnique({where: {id: photoId}, select: {id: true}});
      if (photoExists) return {ok: false, error: 'Photo not found'};
      prisma.comment.create({data: { payload, photo: { connect: { id: photoId } }, user: {connect: { id: loggedInUser.id}} }})
      return {ok: true};
    })
  }
}