import prisma from "../../client";

export default {
  Query: {
    searchPhotos: async (_, {keyword}) => prisma.photo.findMany({where: {caption: {startsWith: keyword}}})
  }
}