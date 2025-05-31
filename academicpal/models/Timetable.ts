// models/Timetable.ts
import mongoose, { Schema } from 'mongoose';

const TimetableSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  days: [{
    day: String,
    subjects: [{
      name: String,
      time: String
    }]
  }]
}, { timestamps: true });

export const Timetable = mongoose.models.Timetable || mongoose.model('Timetable', TimetableSchema);
