import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_ID: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.model('Users', userSchema);

