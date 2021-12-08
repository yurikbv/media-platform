import prisma from "../../client";

export default {
  Query: {
    seeProfile: (_, {username}) => prisma.user.findUnique({where: {username}, include: {following: true, followers: true}})
  }
}