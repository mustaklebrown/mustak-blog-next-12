const { withSuperjson } = require('next-superjson');

module.exports = withSuperjson()({});

module.exports = {
  images: {
    domains: [
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
    ],
  },
};
