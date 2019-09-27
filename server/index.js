const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./src/generated/prisma-client');


const resolvers = {
  Query: {
    info: () => 'my first graphql api',
    feed: (root,args, context, info) => {
      return context.prisma.links();
    },
    cards: (root, args, context, info) => {
      return context.prisma.cards();
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    },
    addCard: (root, args, context) => {
      return context.prisma.createCard({
        front: args.front,
        back: args.back
      });
    },
  }

};

const server = new GraphQLServer({
  typeDefs: require('./schema'),
  resolvers,
  context: { prisma }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
