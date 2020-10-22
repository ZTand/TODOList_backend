import mongoose from 'mongoose';
import { TodoSchema } from './todo';

const { Schema } = mongoose;

const PostSchema = new Schema({
  writer: String,
  todo: TodoSchema,
  point: Number,
  comment: [
    {
      username: String,
      date: Date,
      content: String,
    },
  ],
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
