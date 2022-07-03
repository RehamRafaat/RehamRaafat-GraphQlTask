const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`
  type Post {
    id: ID
    title:String
    text: String
  }
  type Query {
    Posts: [Post]
  }
  type Mutation {
    addPost(title: String!, text:String): Post
    editPost(id: ID!, title: String, text:String): Post
    deletePost(id: ID!): DeleteResponse
  }
  type DeleteResponse {
    ok: Boolean!
  }
`;

const Posts = [
    {
        id: 1,
        title:'First GraphQl',
        text: 'GraphQL provides a more flexible and alternative approach for data-intensive operations in the API Management domain. This will be beneficial for querying and retrieving data in optimized forms. With this approach, it is possible to make applications more efficient.',
    },
    {
        id: 2,
        title:'Harry Potter',
        text: 'The boy who lived, the choosen one who was the only one who have the ability to kill the dark lord voldmort',
    },
    {
        id: 3,
        title:'Mickey Mouse',
        text: 'Tiny mouse which all children love !',
    },
];
  
const resolvers = {
    Query: {
      Posts: () => Posts,
    },
    Mutation: {
        addPost: async (parent, Post) => {
          return addPost(Post);
        },
        editPost: async (parent, { id, ...Post }) => {
          if (!Post[id]) {
            throw new Error("Post doesn't exist");
          }
    
          Posts[id] = {
            ...Posts[id],
            ...Post,
          };
    
          return Posts[id];
        },
        deletePost: async (parent, { id }) => {
          const ok = Boolean(Posts[id]);
          delete Posts[id];
    
          return { ok };
        },
      },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
  });
  
  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });