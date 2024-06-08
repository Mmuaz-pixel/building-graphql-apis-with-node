const express = require('express');
const { ApolloServer } = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const cors = require('cors'); 
const bodyParser = require('body-parser');
const app = express();

async function setupServer(){
	app.use(cors());
	const server = new ApolloServer({
		typeDefs: `
			type Example {
				id: ID!
				title: String!, 
				location: String, 
				Available: Boolean, 
				owner: Owner
			}

			type Owner {
				id: ID!
				name: String!
				exampleId: ID!
			}

			type Query {
				getExamples: [Example]
			}
		`, 
		resolvers: {
			Example: {
				owner: (Example) => ({id: 1, name: 'name', exampleId: Example.id})
			}, 
			Query: {
				getExamples: () => [{id: 1, title: '1st one', location: '1st loc', Available: false}, {id: 2, title: '2nd one', location: '2nd loc', Available: true}]
			}
		}
	}); 
	await server.start(); 
	app.use(bodyParser.json()); 
	app.use('/graphql', expressMiddleware(server)); 
}

setupServer(); 

app.listen(8080, () => {
	console.log('App running on port 8080');
})