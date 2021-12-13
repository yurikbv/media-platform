import prisma from "../../client";

export default {
  Query: {
    seeHashtag: async (_, {hashtag}) => prisma.hashtag.findUnique({where: { hashtag }})
  }
}