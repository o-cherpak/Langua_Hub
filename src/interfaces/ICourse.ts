export interface ICourse {
  id: string;
  name: string;
  subject: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1";
  teacherId: string;
  teacherName: string;
  teacherSurname: string;
  studentIds: string[];
  classroom: string;
  startTime: string;
  endTime: string;
}

// time is ISO 8601 format
