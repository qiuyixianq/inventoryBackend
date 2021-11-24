//express
const express = require('express')
const app = express();
//graphQL
const { ApolloServer } = require('apollo-server-express');
import { typeDefs } from "./graphQL/typedefs";
import { resolvers } from "./graphQL/resolvers";

const server = new ApolloServer({ typeDefs , resolvers });
server.start()
.then(() => server.applyMiddleware({ app }));



app.listen('3001', () => {
    console.log('server is running');
});

