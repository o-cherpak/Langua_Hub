export interface ICourse {
  id: number;
  name: string;
  subject: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  teacherId: number;
  studentIds: number[];
  classroom: string;
  startTime: string;
  endTime: string;
}

// time is ISO 8601 format