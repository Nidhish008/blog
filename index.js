require('dotenv').config();
const cors=require("cors")
app.use(cors())
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

async function startServer() {
  const app = express();

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
