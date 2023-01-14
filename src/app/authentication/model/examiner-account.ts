import { Role } from "src/app/shared/enum/role"

export interface ExaminerAccount {
    id: string,
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  leader: boolean,
  role: Role.EXAMINER
}
