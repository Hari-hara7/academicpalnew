export interface Comment {
  _id: string;
  username: string;
  text: string;
  createdAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  authorName?: string;
  createdAt: string;
  updatedAt?: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
}
