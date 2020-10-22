import mongoose from 'mongoose';

const { Schema } = mongoose;

export const TodoSchema = new Schema({
  content: String,
  date: Date,
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
