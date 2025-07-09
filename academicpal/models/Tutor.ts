import mongoose, { Schema, model, models } from 'mongoose';

const TutorSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: String,
  branch: String,
  year: Number,
  subjects: [String],
  availability: [String], // e.g. ['Evenings', 'Weekends']
  teachingModes: [String], // e.g. ['Chat', 'Video', 'Notes']
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
}, { timestamps: true });

export default models.Tutor || model('Tutor', TutorSchema);
