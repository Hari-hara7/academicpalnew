export interface StudyReminder {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  remindAt: string; // ISO string
  createdAt: string;
  updatedAt: string;
}
