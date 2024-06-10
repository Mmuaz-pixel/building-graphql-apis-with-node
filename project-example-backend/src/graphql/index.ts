import { ApolloServer } from "@apollo/server";
import { User } from "./users";

export async function createGraphqlServer() {
	const graphql = new ApolloServer({
		typeDefs: `
			type Query {
				${User.queries}
			}
	
			type Mutation {
				${User.mutations}
			}
		`,
		resolvers: {
			Query: {
				...User.resolvers.queries
			}, 

			Mutations: {
				...User.resolvers.mutations
			}
		},
	  });

	  await graphql.start(); 

	  return graphql
}

module.exports = {createGraphqlServer}