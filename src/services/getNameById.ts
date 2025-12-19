import type {IStudent} from "../interfaces/IStudent.ts";
import type {ITeacher} from "../interfaces/ITeacher.ts";

type listProps = {
  list: IStudent[] | ITeacher[];
  id: number
}

export function getNameById({list, id} : listProps)  {
  const user = list.find(u => u.id === id);

  if (!user) {
    return null;
  }

  return `${user.name} ${user.surname}`;
}