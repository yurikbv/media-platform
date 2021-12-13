import {protectResolver} from "../../users/users.utils";
import {createWriteStream} from "fs";
import prisma from "../../client";

export default {
  Mutation: {
    uploadPhoto: protectResolver(async (_, {photo, caption}, {loggedInUser}) => {
      let hashtagObjs = [];
      if (caption) {
        const hashtags = caption.match(/#[\w]+/g);
        hashtagObjs = hashtags.map(hashtag => ({where: {hashtag}, create: {hashtag}}))
      }
      const { filename, createReadStream } = await photo;
      const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
      const readStream = createReadStream();
      const writeStream = createWriteStream(process.cwd() + '/server/uploads/' + newFilename);
      readStream.pipe(writeStream);
      let photoUrl = `http://localhost:4000/static/${newFilename}`;
      return prisma.photo.create({ data: {photo: photoUrl, caption,
          user: { connect: {id: loggedInUser.id} },
          ...(hashtagObjs.length > 0 && ({hashtags: {connectOrCreate: hashtagObjs}}))} })
    })
  }
}