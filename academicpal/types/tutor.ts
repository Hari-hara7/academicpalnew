export interface Tutor {
  _id?: string;
  userId: string;
  name: string;
  branch: string;
  year: number;
  subjects: string[];
  availability: string[];
  teachingModes: string[];
  rating?: number;
  ratingCount?: number;
  createdAt?: string;
  updatedAt?: string;
}
