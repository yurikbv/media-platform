import express  from'express';
import { IncomingHttpHeaders } from "http";
import {ApolloServer} from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import logger from 'morgan';
const path = require('path');
import {typeDefs, resolvers} from "./schema";
import { getUser } from "./users/users.utils";
import prisma from "./client";
import {ContextBody} from "./types";
require('dotenv').config();
const PORT = process.env.PORT

async function startServer() {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({req}) => {
      // @ts-ignore
      return {
        loggedInUser: await getUser(req.headers.token),
        prisma
    }
  }});
  await server.start();
  const app = express();
  app.use(logger("tiny"));
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  app.use("/static", express.static(path.join(__dirname, 'uploads')));
  // await new Promise(r => app.listen({port: PORT}, r));
  // console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  await app.listen({port: PORT}, () => console.log(`Server is running on ${PORT}${server.graphqlPath}`))
}

startServer();


