import type {ILanguage} from "./ILanguage.ts";

export interface IMark {
  id: number;
  studentId: number;
  teacherId: number;
  language: ILanguage;
  mark: number;
  date: string;
  comment?: string;
}