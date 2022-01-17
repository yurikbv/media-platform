import prisma from "../client";

export default {
  Photo: {
    user: ({userId}) => prisma.user.findUnique({where: {id: userId}}),
    hashtags: ({id}) => prisma.hashtag.findMany({where: {photos: { some: {id} }}}),
    likes: ({id}) => prisma.like.count({where: {photoId: id}}),
    comments: ({id}) => prisma.comment.count({where: {photoId: id}}),
    isMine: ({userId}, _, {loggedInUser}) => {
      if (loggedInUser) return false;
      return userId === loggedInUser.id
    },
    isLiked: async ({id}, _, {loggedInUser}) => {
      if (loggedInUser) return false;
      const ok = await prisma.like
        .findUnique({where: { photoId_userId: { photoId: id, userId: loggedInUser.id } },select: {id: true}});
      return Boolean(ok);
    }
  },
  Hashtag: {
    totalPhotos: ({id},_) => prisma.photo.count({where: {hashtags: {some: {id}}}}),
    photos: ({id}, {page}) => {
      return prisma.hashtag.findUnique({where: {id}}).photos({ take: 10, skip: (page - 1) * 10 })
    }
  }
}