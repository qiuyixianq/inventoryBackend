//.env
require('dotenv').config();
//express
const express = require('express');
const app = express();
//graphQL
const { ApolloServer } = require('apollo-server-express');
import { typeDefs } from "./graphQL/typedefs";
import { resolvers } from "./graphQL/resolvers";
//Mongoose
const mongoose = require('mongoose');

const server = new ApolloServer({ typeDefs , resolvers });
server.start().then(() => server.applyMiddleware({ app }));


//server
app.listen(process.env.PORT || 3001 , () => console.log('server is running') );


//database
mongoose.connect(process.env.MONGOOSE_CON, { useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to mongoDB");
});

