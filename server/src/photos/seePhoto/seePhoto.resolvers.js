import prisma from "../../client";

export default {
  Query: {
    seePhoto: async (_, {id}) => prisma.photo.findUnique({where: {id}})
  }
}