const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./src/generated/prisma-client');


const resolvers = {
  Query: {
    info: () => 'my first graphql api',
    feed: (root,args, context, info) => {
      return context.prisma.links();
    },
    cards: (root, args, context, info) => {
      console.log('getting cards');
      return context.prisma.cards();
    },
    deck: (root, args, context, info) => {
      console.log('getting single deck');
      return context.prisma.deck({
        id: args
      });
    },
    decks: (root, args, context, info) => {
      console.log('getting decks');
      return context.prisma.decks();
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    },
    // Card Operations
    addCard: (root, args, context) => {
      console.log('adding card');
      return context.prisma.createCard({
        front: args.front,
        back: args.back,
        deck: {
          connect: {
            id: args.deckId
          }
        }
      });
    },
    deleteCard: (root, args, context) => {
      console.log('deleting card');
      return context.prisma.deleteCard({
        id: args.id
      });
    },
    editCard: (root, args, context) => {
      console.log('editing card');
      return context.prisma.updateCard({
        where: {id: args.id},
        data: {front: args.front, back: args.back}
      });
    },
    // Deck Operations
    addDeck: (root, args, context) => {
      console.log('adding deck');
      return context.prisma.createDeck({
        name: args.name,
        description: args.description,
      });
    }
  }

};

const server = new GraphQLServer({
  typeDefs: require('./schema'),
  resolvers,
  context: { prisma }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
