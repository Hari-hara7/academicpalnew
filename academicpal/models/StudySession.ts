import mongoose, { Schema, Document } from 'mongoose';

export interface StudySessionDocument extends Document {
  userId: string;
  subject: string;
  hours: number;
  date: Date;
  performance?: number; // 1 to 10 self-rated (optional)
}

const StudySessionSchema = new Schema<StudySessionDocument>({
  userId: { type: String, required: true },
  subject: { type: String, required: true },
  hours: { type: Number, required: true },
  date: { type: Date, required: true },
  performance: { type: Number, min: 1, max: 10 },
});

export default mongoose.models.StudySession ||
  mongoose.model<StudySessionDocument>('StudySession', StudySessionSchema);
