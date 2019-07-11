var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define Todo schema
var TodoSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  completed: { type: Boolean, default: false },
});

// Export model
module.exports = mongoose.model('Todo', TodoSchema);
