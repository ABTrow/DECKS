const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
  link(id: ID!): Link
  cards: [Card!]!
  card(id: ID!): Card
}

type Mutation {
  post(url: String!, description: String!): Link!
  addCard(front: String!, back: String!): Card!
}

type Link {
  id: ID!
  description: String!
  url: String!
}

type Card {
  id: ID!
  front: String!
  back: String!
}

`;

module.exports = typeDefs;
