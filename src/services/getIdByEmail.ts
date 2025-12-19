import type {IStudent} from "../interfaces/IStudent.ts";
import type {ITeacher} from "../interfaces/ITeacher.ts";

type listProps = {
  list: IStudent[] | ITeacher[];
  email: string
}

export function getIdByEmail({list, email} : listProps)  {
  const user = list.find(u => u.email === email);

  if (!user) {
    return null;
  }

  return user.id;
}