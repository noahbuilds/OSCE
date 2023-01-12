import {Role} from "../../shared/enum/role";

export class Account {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  authority: Role
}
