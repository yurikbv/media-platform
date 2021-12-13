import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    user: User!
    photo: String!
    caption: String
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos: [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }
`