import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (_, {firstName, lastName, username, email, password}) => {
      try {
        // check if username or email are already taken
        const userExists = await client.user.findFirst({
          where: { OR: [{username}, {email}] }
        })
        if (userExists) {
          throw new Error('This username/password is already taken.')
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // save and return the user
        return client.user.create({data: {
            username, email, firstName, lastName, password: hashedPassword
          }})
      } catch (e) {
        console.log(e);
        return e;
      }
    }
  }
}