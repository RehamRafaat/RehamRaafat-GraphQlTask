const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`
  type comment {
    name: String
    comment: String
  }
  type Post {
    id: ID
    title:String
    text: String
    comments: [comment]
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
        comments: [{ name: "Reham", comment: "brillient !" },{ name: "Amir", comment: "Fantastic" }],
    },
    {
        id: 2,
        title:'Harry Potter',
        text: 'The boy who lived, the choosen one who was the only one who have the ability to kill the dark lord voldmort',
        comments: [{ name: "Ron", comment: "I adore this series!" }],
    },
    {
        id: 3,
        title:'Mickey Mouse',
        text: 'Tiny mouse which all children love !',
        comments: [{ name: "Reham", comment: "at which channel movie will come?" },{ name: "Mohra", comment: "it comes on MBC3 at 9:00 pm" },{ name: "Nour", comment: "My best Movie" }],
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