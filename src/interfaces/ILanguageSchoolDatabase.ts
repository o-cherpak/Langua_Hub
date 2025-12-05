import type {IStudent} from "./IStudent.ts";
import type {ITeacher} from "./ITeacher.ts";
import type {ICourse} from "./ICourse.ts";
import type {IAnnouncement} from "./IAnnouncement.ts";

export interface ILanguageSchoolDatabase {
  students:IStudent[];
  teachers:ITeacher[];
  courses: ICourse[];
  announcements: IAnnouncement[];
}