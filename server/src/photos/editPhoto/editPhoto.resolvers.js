import {protectResolver} from "../../users/users.utils";
import prisma from "../../client";
import {processHashtags} from "../photo.utils";

export default {
  Mutation: {
    editPhoto: protectResolver(async (_, {id, caption}, {loggedInUser}) => {
      const oldPhoto = prisma.photo.findFirst({where: {id, userId: loggedInUser.id},
        include: {hashtags: { select: { hashtag: true } }}});
      if (!oldPhoto) return { ok: false, error: 'You are not allowed to edit the photo' }
      await prisma.photo.update({where: {id},
        data: {caption, disconnect: oldPhoto.hashtags, connectOrCreate: processHashtags(caption)}})
      return {ok: true}
    })
  }
}