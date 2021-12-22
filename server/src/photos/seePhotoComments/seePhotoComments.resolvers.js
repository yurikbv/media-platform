import prisma from "../../client";

export default {
  Query: {
    seePhotoComments: (_, {id}) => prisma.comment.findMany({where: {photoId: id}, orderBy: {createdAt: 'asc'}})
  }
}