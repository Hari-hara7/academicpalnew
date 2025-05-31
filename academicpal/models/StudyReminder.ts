import mongoose, { Schema, Document } from 'mongoose';

export interface IStudyReminder extends Document {
  userId: string;
  title: string;
  description?: string;
  remindAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StudyReminderSchema = new Schema<IStudyReminder>(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    remindAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.StudyReminder ||
  mongoose.model<IStudyReminder>('StudyReminder', StudyReminderSchema);
