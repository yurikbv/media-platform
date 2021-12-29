import {protectResolver} from "../../users/users.utils";
import prisma from "../../client";
import pubsub from "../../pubsub";
import {NEW_MESSAGE} from "../../constants";

export default {
  Mutation: {
    sendMessage: protectResolver(async (_, {payload, roomId, userId}, {loggedInUser}) => {
      let room = null;
      if (userId) {
        const user = await prisma.user.findUnique({where: {id: userId}, select: { id: true }});
        if (!user) return { ok: false, error: 'This User not exist.' };
        room = await prisma.room.create({data: {users: { connect: [{ id: userId }, { id: loggedInUser.id }] }}});
      } else if (roomId) {
        room = await prisma.room.findUnique({where: { id: roomId }, select: {id: true}});
        if (!room) return { ok: false, error: "Room not found" }
      }
      const message = await prisma.message.create({data: {
          payload,
          room: { connect: { id: room.id } },
          user: { connect: { id: loggedInUser.id} }
        }})
      await pubsub.publish(NEW_MESSAGE, {roomUpdates: {...message}});
      return { ok: true };
    })
  }
}