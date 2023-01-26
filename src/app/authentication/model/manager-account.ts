import { Role } from "src/app/shared/enum/role"

export interface ManagerAccount {
  
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    examId?: string,
    role: Role.MANAGER
  
}
