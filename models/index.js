const User = require("./User");
const Post = require("./Post");

const Comment = require("./Comment");

// initial reverse association
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// associations that are affiliated w/ comment table
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});
module.exports = { User, Post, Comment };
