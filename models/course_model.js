import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
    required: true,
  },

  Category: {
    type: String,
    required: true,
  },

  Date: {
    type: String,
    required: true,
  },
});

export default mongoose.model('course', courseSchema);
