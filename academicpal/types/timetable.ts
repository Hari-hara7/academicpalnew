// types/timetable.ts
export type Subject = {
  name: string;
  time: string;
};

export type DaySchedule = {
  day: string;
  subjects: Subject[];
};

export type TimetableType = {
  _id: string;
  userId: string;
  title: string;
  days: DaySchedule[];
};
