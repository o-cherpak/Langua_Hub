import type { ILanguage } from "./ILanguage.ts";

export interface IStudent {
  uid: string;
  email: string;
  "role": string,
  languages: ILanguage[];
  name: string;
  phone: string;
  surname: string;
}
