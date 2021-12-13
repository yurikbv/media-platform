import prisma from "../client";

export default {
  Photo: {
    user: ({userId}) => prisma.user.findUnique({where: {id: userId}}),
    hashtags: ({id}) => prisma.hashtag.findMany({where: {photos: { some: {id} }}})
  },
  Hashtag: {
    totalPhotos: () => 12
  }
}