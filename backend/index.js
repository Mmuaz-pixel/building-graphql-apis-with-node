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
				Available: Boolean
			}

			type Query {
				getExample: [Example]
			}
		`, 
		resolvers: {}
	}); 
	await server.start(); 
	app.use(bodyParser.json()); 
	app.use('/graphql', expressMiddleware(server)); 
}

setupServer(); 

app.listen(8080, () => {
	console.log('App running on port 8080');
})