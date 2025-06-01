export interface StudySession {
  _id?: string;
  subject: string;
  hours: number;
  date: string; // ISO format
  performance?: number;
}
