export interface ForumReply {
  _id?: string;
  userId: string;
  username: string;
  message: string;
  upvotes: number;
  edited?: boolean;
  createdAt: string;
}

export interface ForumPost {
  _id?: string;
  title: string;
  body: string;
  tags: string[];
  userId: string;
  username: string;
  replies: ForumReply[];
  views?: number;
  isResolved?: boolean;
  pinned?: boolean;
  lastRepliedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}
