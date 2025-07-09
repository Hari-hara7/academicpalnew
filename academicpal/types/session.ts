export interface SessionType {
  _id: string;
  tutorId: {
    _id: string;
    name: string;
  };
  learnerId: {
    _id: string;
    name: string;
  };
  subject: string;
  scheduledAt: string;
  mode: 'chat' | 'video' | 'notes';
  meetingLink?: string;
  notes?: string;
  status: 'pending' | 'accepted' | 'completed';
  feedback?: {
    rating: number;
    review: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
