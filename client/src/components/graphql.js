import gql from "graphql-tag";

export const fetchAllPosts = gql`
  {
    getPosts {
      id
      username
      createdAt
      commentCount
      likeCount
      user
      body
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;
