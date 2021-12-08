const { GraphQLUpload} = require('graphql-upload');

export default {
  Upload: GraphQLUpload,
  Mutation: {
    singleUpload: async (_, {file}) => {
      const { filename, mimetype, encoding } = await file;
      return { filename, mimetype, encoding };
    }
  }
}