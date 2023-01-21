import { Role } from "src/app/shared/enum/role"

export interface ExaminerAccount {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    leader: boolean,
    procedureId: string,
    procedureName: string,
    examId: string,
    programName: string,
    programId: string,
    role: Role.EXAMINER
}
