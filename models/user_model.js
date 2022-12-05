import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  nickName: {
    type: String,
    required: true,
  },

  speciality: {
    type: String,
    required: true,
  },

  Birthday: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  mail: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  isInstructor: {
    type: Boolean,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('User_Learn', userSchema);
