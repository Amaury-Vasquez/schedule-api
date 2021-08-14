export interface SubjectValues {
  name: string;
  teacher: string;
  hours: string[];
}

export interface ScheduleValues {
  subjects: SubjectValues[];
  days: string[];
}
