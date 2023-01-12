import { Role } from "../../shared/enum/role";

export interface ManagerAccount {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  authority: Role;
}
