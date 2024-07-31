import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['To-Do', 'In Progress', 'Under Review', 'Completed'], required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'Urgent'] },
  deadline: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
