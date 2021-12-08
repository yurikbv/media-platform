import { createWriteStream } from 'fs';
import prisma from "../../client";
import bcrypt from "bcrypt";
import {protectResolver} from "../users.utils";

const resolverFn = async (_, {firstName, lastName, username, email, password, bio, avatar}, {loggedInUser}) => {
  let avatarUrl = null;
  if (avatar) {
    const { filename, createReadStream } = await avatar;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(process.cwd() + '/server/uploads/' + newFilename);
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:4000/static/${newFilename}`;
  }
 
  let hashedPassword = null;
  if (password) hashedPassword = await bcrypt.hash(password, 10);
  const updatedUser = await prisma.user.update({where: {id: loggedInUser.id}, data: {firstName, lastName, username, email
      , bio, ...(hashedPassword && { password: hashedPassword }), ...(avatarUrl && {avatar: avatarUrl})}});
  if (updatedUser.id) {
    return {ok: true}
  } else return { ok: false, error: 'Could not update profile' }
}

export default {
  Mutation: {
    editProfile: protectResolver(resolverFn)
  }
}