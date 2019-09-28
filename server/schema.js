const typeDefs = `
type Query {
  info: String!

  feed: [Link!]!
  link(id: ID!): Link

  cards: [Card!]!
  card(id: ID!): Card

  deck(id: ID!): Deck
  decks: [Deck!]!
}

type Mutation {
  post(url: String!, description: String!): Link!
  addCard(front: String!, back: String!, deckId: ID!): Card!
  deleteCard(id: ID!): Card!
  editCard(id: ID!, front: String!, back: String!): Card!
  addDeck(name: String!, description: String!): Deck!
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
  deck: Deck!
}

type Deck {
  id: ID!
  name: String!
  description: String!
  cards: [Card!]!
}

`;

module.exports = typeDefs;
