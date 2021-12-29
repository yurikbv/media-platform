import {protectResolver} from "../../users/users.utils";
import prisma from "../../client";

export default {
  Query: {
    seeRooms: protectResolver(async (_, __, {loggedInUser}) =>
      await prisma.room.find({where: {users: {some: {id: loggedInUser.id}}}, include: { users: true}}))
  }
}