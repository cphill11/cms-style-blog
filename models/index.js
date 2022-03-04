const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');

// create initial associations
    // initial forward association
User.hasMany(Post, {
    foreignKey: 'user_id'
});
    // initial reverse association
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// create associations that allow User & Post models to query each other in context of a Vote
// use of both foreign keys prevents 1 user from voting on 1 post many times
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
  });
  
 Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
 });

 // associations that enable us to see total number of votes on a post
 Vote.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  Vote.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
  User.hasMany(Vote, {
    foreignKey: 'user_id'
  });
  
  Post.hasMany(Vote, {
    foreignKey: 'post_id'
  });

// associations that are affiliated w/ comment table
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});
module.exports = { User, Post, Vote, Comment };