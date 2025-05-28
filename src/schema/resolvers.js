const User = require('../models/User');
const Post = require('../models/Post');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    posts: async () => {
      return await Post.find().populate('author');
    },
  },

  Mutation: {
    createUser: async (_, { name, email }) => {
      try {
        const user = await User.create({ name, email });
        return user;
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
      }
    },

    createPost: async (_, { title, content, authorId }) => {
  try {
    // Optional: Verify author exists before creating post
    const userExists = await User.findById(authorId);
    if (!userExists) {
      throw new Error('Author not found');
    }

    const post = await Post.create({ title, content, author: authorId });
    await post.populate('author');
    return post;
  } catch (error) {
    console.error('Detailed createPost error:', error);
    throw new Error(error.message || 'Failed to create post');
  }
},

  },
};

module.exports = resolvers;
