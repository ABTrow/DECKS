const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');


const cards = [
  {
    front: 'First Card',
    back: 'Card the First',
    id: 1
  },
  {
    front: 'Second Card',
    back: 'Card the Second',
    id: 2
  }
];

const authors = {
  'Flavio': {
    name: 'Flavio',
    age: 36
  },
  'Roger': {
    name: 'Roger',
    age: 7
  }
};

const authorType =  new GraphQLObjectType({
  name: 'Author',
  fields: {
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  }
});

const cardType =  new GraphQLObjectType({
  name: 'Card',
  fields: {
    front: {
      type: GraphQLString
    },
    back: {
      type: GraphQLString
    },
    id: {
      type: GraphQLInt
    }
  }
});

const queryType =  new GraphQLObjectType({
  name: 'Query',
  fields: {
    card: {
      type: cardType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (source, {id}) => {
        return cards[id];
      }
    },
    cards: {
      type: new GraphQLList(cardType),
      resolve: () => {
        return cards;
      }
    }
  }
});


const schema = new GraphQLSchema({
  query: queryType
});

module.exports = schema;
