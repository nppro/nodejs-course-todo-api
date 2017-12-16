const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true,
  /* other options */
});

// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect();

// truyền biến mongoose ra ngoài
module.exports = {mongoose};