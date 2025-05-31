import mongoose, { Schema, models } from 'mongoose';

const StudyTaskSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    subject: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  },
  {
    timestamps: true,
  }
);

const StudyTask = models.StudyTask || mongoose.model('StudyTask', StudyTaskSchema);
export default StudyTask;
