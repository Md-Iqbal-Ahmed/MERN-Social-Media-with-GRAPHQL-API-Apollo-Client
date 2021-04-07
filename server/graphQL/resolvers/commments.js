const Post = require("../../model/postSchema");
const User = require("../../model/userSchema");
const auth = require("../../utils/auth");
const { UserInputError, AuthenticationError } = require("apollo-server");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = auth(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty commment", {
          errors: {
            body: "Commment body can't be empty",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });

        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = auth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((i) => i.id === commentId);

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Access denied");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
