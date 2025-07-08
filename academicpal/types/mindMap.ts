export interface MindMap {
  _id: string;
  userId: string;
  topic: string;
  subtopics: {
    title: string;
    keywords: string[];
  }[];
  createdAt: string;
  updatedAt: string;
}
