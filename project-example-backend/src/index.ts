import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = Number(process.env.PORT) || 8000;

async function start() {
  const app = express();

  app.use(express.json()); 

  const graphql = new ApolloServer({
    typeDefs: `
		type Query {
			hello: String
		}
	`,
    resolvers: {},
  });

  await graphql.start();

  app.use('/graphql', expressMiddleware(graphql)); 

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
}

start(); 