import mongoose, { Schema, model, models } from 'mongoose';

const SessionSchema = new Schema({
  tutorId: { type: Schema.Types.ObjectId, ref: 'Tutor', required: true },
  learnerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subject: String,
  scheduledAt: Date,
  mode: String, // Chat, Video, Notes
  status: { type: String, enum: ['pending', 'accepted', 'completed', 'cancelled'], default: 'pending' },
  meetingLink: String, // optional: Google Meet / Zoom URL
  notes: String, // optional shared notes or summary
}, { timestamps: true });

export default models.Session || model('Session', SessionSchema);
