import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import dotenv from "dotenv";
import { prismaClient } from "./lib/db";

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

		type Mutation {
			createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
		}
	`,
    resolvers: {
		Query: {
			hello: () => 'Hi'
		}, 

		Mutation: {
			createUser: async(_ , {firstName, lastName, email, password}: 
				{
					firstName: string; 
					lastName: string; 
					email: string;
					password: string;
				}
			) => {
				await prismaClient.user.create({
					data: {
						firstName, 
						lastName, 
						password, 
						salt: 'salt', 
						email
					}
				})

				return true; 
			}
		}
	},
  });

  await graphql.start();

  app.use('/graphql', expressMiddleware(graphql)); 

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
}

start(); 