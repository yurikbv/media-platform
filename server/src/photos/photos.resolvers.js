import prisma from "../client";

export default {
  Photo: {
    user: ({userId}) => prisma.user.findUnique({where: {id: userId}}),
    hashtags: ({id}) => prisma.hashtag.findMany({where: {photos: { some: {id} }}}),
    likes: ({id}) => prisma.like.count({where: {photoId: id}})
  },
  Hashtag: {
    totalPhotos: ({id},_) => prisma.photo.count({where: {hashtags: {some: {id}}}}),
    photos: ({id}, {page}, {loggedInUser}) => {
      return prisma.hashtag.findUnique({where: {id}}).photos({ take: 10, skip: (page - 1) * 10 })
    }
  }
}