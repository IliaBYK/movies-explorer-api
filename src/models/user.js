import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(v) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

export default model('user', userSchema);
