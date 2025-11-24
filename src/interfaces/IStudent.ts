import type {ILanguage} from "./ILanguage.ts";

export interface IStudent {
  email: string;
  id: number;
  languages: ILanguage[];
  name: string;
  phone: string;
  surname: string;
}