import mongoose, { Schema, models } from 'mongoose';

const ReplySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true } // allow individual reply _id
);

const ForumPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    body: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    replies: {
      type: [ReplySchema],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    lastRepliedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const ForumPost = models.ForumPost || mongoose.model('ForumPost', ForumPostSchema);
export default ForumPost;
