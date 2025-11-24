import type {IStudent} from "./IStudent.ts";
import type {ITeacher} from "./ITeacher.ts";
import type {ICourse} from "./ICourse.ts";

export interface ILanguageSchoolDatabase {
  students:IStudent[];
  teachers:ITeacher[];
  courses: ICourse[];
}