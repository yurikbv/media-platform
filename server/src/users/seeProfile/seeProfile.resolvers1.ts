import prisma from "../../client";
import {Resolvers} from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: (_, {username}) => prisma.user.findUnique({where: {username}, include: {following: true, followers: true}})
  }
}

export default resolvers;