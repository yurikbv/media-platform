import prisma from "../../client";

export default {
  Query: {
    seePhotoLikes: async (_, {id}) => {
      const likes = prisma.like.findMany({where: {photoId: id}, select: {user: true}});
      return likes.map( like => like.user);
    }
  }
}