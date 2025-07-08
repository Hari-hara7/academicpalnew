import mongoose, { Schema, Document } from 'mongoose';

export interface IMindMap extends Document {
  userId: string;
  topic: string;
  subtopics: {
    title: string;
    keywords: string[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const MindMapSchema = new Schema<IMindMap>(
  {
    userId: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    subtopics: [
      {
        title: { type: String, required: true },
        keywords: [{ type: String }],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.MindMap ||
  mongoose.model<IMindMap>('MindMap', MindMapSchema);
