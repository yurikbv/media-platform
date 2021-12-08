import { gql } from "apollo-server-express";

export default gql`
  type User{
    id: String!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    bio: String
    avatar: Upload
    createdAt: String!
    updatedAt: String!
    following: [User]
    followers: [User]
  }
`