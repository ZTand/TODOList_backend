import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import todo, { TodoSchema } from './todo';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  id: String,
  password: String,
  point: Number,
  todos: [TodoSchema],
});

UserSchema.methods.setPassword = function (password) {
  this.password = password;
};
UserSchema.methods.checkPassword = function (password) {
  return this.password === password;
};
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username }); // static method에서 this는 Model을 가리킨다.
};
UserSchema.statics.findById = function (id) {
  return this.findOne({ id }); // static method에서 this는 Model을 가리킨다.
};
UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '28d',
    },
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
export default User;
