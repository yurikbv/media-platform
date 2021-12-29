import {protectResolver} from "../../users/users.utils";
import prisma from "../../client";

export default {
  Query: {
    seeRoom: protectResolver(async (_, {id}, {loggedInUser}) =>
      prisma.room.findFirst({where: {id, users: { some: {id: loggedInUser.id} }}}))
  }
}