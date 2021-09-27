export interface ScheduleValues {
  subjects: SubjectValues[];
  days: string[];
}
export interface SubjectValues {
  name: string;
  teacher: string;
  hours: string[];
}

export interface UserData {
  _id: string;
  email: string;
  username: string;
  schedule: ScheduleValues;
}
