// index.js
const User = require('./User');
const Post = require('./Post');
const Comment = require('./comments'); 

User.hasMany(Post, {
  onDelete: 'CASCADE'
});

Post.belongsTo(User);

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'commentAuthor'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  as: 'postComment'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  as: 'userComments'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  as: 'postComments'
});

module.exports = { User, Post, Comment};
