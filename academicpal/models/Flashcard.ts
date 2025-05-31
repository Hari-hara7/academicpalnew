import mongoose, { Schema, Document } from 'mongoose';

export interface FlashcardDoc extends Document {
  userId: string;
  question: string;
  answer: string;
  createdAt: Date;
}

const FlashcardSchema = new Schema<FlashcardDoc>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Flashcard = mongoose.models.Flashcard || mongoose.model<FlashcardDoc>('Flashcard', FlashcardSchema);
