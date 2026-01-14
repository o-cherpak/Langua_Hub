import type { ILanguage } from "./ILanguage.ts";

export interface IMark {
  id: string;
  studentId: string;
  teacherId: string;
  language: ILanguage;
  mark: number;
  date: string;
  comment?: string;
}
