const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/issuetracker';

// Atlas URL  - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';

// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/issuetracker';

let db;

let aboutMessage = "Issue Tracker API v1.0";

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    read_entry_list,
    read_entry_information,
  },
  Mutation: {
    add_entry,
    delete_entry,
    delete_all_entry,
  },

};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

async function read_entry_list() {
  const entries = await db.collection('entries').find({}).toArray();
  return entries;
}



async function read_entry_information(number) {
  const entry = await db.collection('entries').find({serial_number:number}).toArray();
  return entry;
}

function entry_validate(entry) {
  const errors = [];
  if (entry.serial_number <= 0 || entry.serial_number >25) {
    errors.push('Field "serial_number" must be within the range of 1 to 25.');
  }
  if ( !entry.serial_number || !entry.name || !entry.phone_number || !entry.time_stamp) {
    errors.push('Please make sure all the fields are filled');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function add_entry(_, {entry}) {
  entry_validate(entry)
  const result = await db.collection('entries').insertOne(entry);
  const savedIssue = await db.collection('entries')
    .findOne({serial_number: entry.serial_number});
  return savedIssue;
}

function delete_entry(_, {delete_entry}) {
  db.collection('entries').deleteOne({serial_number:delete_entry.serial_number});
  return true
}

function delete_all_entry(_, { message}) {
  db.collection('entries').deleteMany({});
  return true
}

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();



server.applyMiddleware({ app, path: '/graphql' });

(async function () {
  try {
    await connectToDb();
    app.listen(5000, function () {
      console.log('AppAPI server started on port 5000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
