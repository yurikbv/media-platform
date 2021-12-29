import express from'express';
import {ApolloServer} from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import logger from 'morgan';
const path = require('path');
import {createServer} from "http";
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import {typeDefs, resolvers, schema} from "./schema";
import { getUser } from "./users/users.utils";
require('dotenv').config();
const PORT = process.env.PORT

async function startServer() {
  
  const app = express();
  const httpServer = createServer(app);
  
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: async (ctx) => {
      if (ctx.req) {
        return {loggedInUser: await getUser(ctx.req.headers.token)}
      } else {
        return { loggedInUser: ctx.connection.context.loggedInUser }
      }
    }
  })
  await server.start();
  app.use(logger("tiny"));
  app.use(graphqlUploadExpress());
  app.use("/static", express.static(path.join(__dirname, 'uploads')));
  server.applyMiddleware({ app });
  
  SubscriptionServer.create({
    schema,
    execute,
    subscribe,
    async onConnect(connectionParams) {
      const { token } = connectionParams;
      if (!token) throw new Error("You can't listen.");
      const loggedInUser = await getUser(token)
      return { loggedInUser };
    }
  }, {
    server: httpServer,
    path: server.graphqlPath
  });
  
  // await new Promise(r => app.listen({port: PORT}, r));
  // console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  httpServer.listen(PORT, () => {
    console.log(`🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`);
  })
}

startServer();


