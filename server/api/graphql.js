const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const graphql = graphqlHTTP({
  schema: schema,
  graphiql: true
});

module.exports = graphql;
