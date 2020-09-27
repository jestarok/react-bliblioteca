const mongoose = require('mongoose');
const pageSchema = new mongoose.Schema({
  ISBN: {
    type: Number,
    required: true,
  },
  pageNumber: {
    type: Number,
    required: true,
  },
  pageText: {
    type: String,
  },
});
pageSchema.index({ ISBN: 1, pageNumber: 1 }, { unique: true, dropDups: true });
const Page = mongoose.model('Page', pageSchema);
module.exports = Page;
