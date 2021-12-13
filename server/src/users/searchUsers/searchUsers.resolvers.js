import prisma from "../../client";

export default {
  Query: {
    searchUsers: async (_, {keyword}) => prisma.user.findMany({ where: { username: { startsWith: keyword.toLowerCase() } }})
  }
}