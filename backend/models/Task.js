import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  }, 
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low' ],
    default: 'Medium',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  isOutdoor: {
    type: Boolean,
    required: true, // Determines if the task is outdoor-related
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
