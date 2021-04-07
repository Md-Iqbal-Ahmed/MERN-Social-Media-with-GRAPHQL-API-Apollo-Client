const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Post", postSchema);

// const mongoose = require("mongoose");

// const postSchema = new mongoose.Schema({
//   body: String,
//   username: String,
//   createdAt: String,
//   comments: [
//     {
//       body: String,
//       username: String,
//       createdAt: String,
//     },
//   ],
//   likes: [
//     {
//       username: String,
//       createdAt: String,
//     },
//   ],
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },
// });

// const Post = mongoose.model("Post", postSchema);

// module.exports = Post;
