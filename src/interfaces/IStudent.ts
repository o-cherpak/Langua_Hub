import type {ILanguage} from "./ILanguage.ts";

export interface IStudent {
  email: string;
  id: string;
  languages: ILanguage[];
  name: string;
  phone: string;
  surname: string;
}