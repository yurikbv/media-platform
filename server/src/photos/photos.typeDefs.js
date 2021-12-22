import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    user: User!
    photo: String!
    caption: String
    hashtags: [Hashtag]
    likes: Int!
    comments: Int!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos(pages: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    photo: Photo!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`