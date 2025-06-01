export interface StudyGroup {
  _id: string;
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
  createdAt: string; // ISO string
}
