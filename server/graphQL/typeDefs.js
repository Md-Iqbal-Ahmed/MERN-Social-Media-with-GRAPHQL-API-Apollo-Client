const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    user: ID!
    username: String!
    createdAt: String!
    likes: [Like]!
    comments: [Comment]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  type Users {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post!]
    getPost(postId: ID!): Post!
    getUsers: [Users!]
  }
  type Mutation {
    register(registerInput: RegisterInput): Users!
    login(username: String!, password: String!): Users!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: String!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;
