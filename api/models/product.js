const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  name: {
    type: String,
    required: true,
    minlength: 3,
  },

  price: {
    type: Number,
    required: true,
    min: 0.01,
  },

  productImage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
