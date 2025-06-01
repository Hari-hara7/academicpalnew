import mongoose, { Schema, Document, model } from 'mongoose';

export interface IStudyGroup extends Document {
  creatorId: string;
  subject: string;
  groupName: string;
  description: string;
  meetingTime: string;
  location: string;
  platform?: string;
  maxMembers: number;
  isOpen: boolean;
  members: string[];
  joinRequests: string[];
  createdAt: Date;
}

const StudyGroupSchema = new Schema<IStudyGroup>({
  creatorId: { type: String, required: true },
  subject: { type: String, required: true },
  groupName: { type: String, required: true },
  description: { type: String, required: true },
  meetingTime: { type: String, required: true },
  location: { type: String, required: true },
  platform: { type: String },
  maxMembers: { type: Number, required: true },
  isOpen: { type: Boolean, default: true },
  members: [{ type: String }],
  joinRequests: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export const StudyGroup =
  mongoose.models.StudyGroup || model<IStudyGroup>('StudyGroup', StudyGroupSchema);
