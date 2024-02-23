const { User, Book } = require('../models');

const resolvers = {
  Query: {
    // Resolver for querying all users
    users: async () => {
      return await User.find();
    },
    // Resolver for querying all books
    books: async () => {
      return await Book.find();
    },
    // Resolver for querying a single user by ID
    user: async (_, { userId }) => {
      return await User.findById(userId);
    },
    // Resolver for querying a single book by ID
    book: async (_, { bookId }) => {
      return await Book.findById(bookId);
    }
  },
  Mutation: {
    // Resolver for creating a new user
    createUser: async (_, { username, email }) => {
      return await User.create({ username, email });
    },
    // Resolver for creating a new book
    createBook: async (_, { title, author }) => {
      return await Book.create({ title, author });
    }
    // Additional mutation resolvers can be defined here
  }
};

module.exports = resolvers;
