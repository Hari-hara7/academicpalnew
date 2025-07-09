import mongoose, { Schema, model, models } from 'mongoose';

const FeedbackSchema = new Schema({
  sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  learnerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tutorId: { type: Schema.Types.ObjectId, ref: 'Tutor', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  review: String,
}, { timestamps: true });

export default models.Feedback || model('Feedback', FeedbackSchema);
