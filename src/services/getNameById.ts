import type {ITeacher} from "../interfaces/ITeacher.ts";
import type {IStudent} from "../interfaces/IStudent.ts";

export function getNameById(list: IStudent[] | ITeacher[], id: string)  {
  const user = list.find(u => u.id === id);

  if (!user) {
    return null;
  }

  return `${user.name} ${user.surname}`;
}