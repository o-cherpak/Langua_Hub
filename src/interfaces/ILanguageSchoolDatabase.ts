import type { IStudent } from "./IStudent.ts";
import type { ITeacher } from "./ITeacher.ts";
import type { ICourse } from "./ICourse.ts";
import type { IAnnouncement } from "./IAnnouncement.ts";
import type { IMark } from "./IMark.ts";

export interface ILanguageSchoolDatabase {
  students: IStudent[];
  teachers: ITeacher[];
  courses: ICourse[];
  announcements: IAnnouncement[];
  marks: IMark[];
}
