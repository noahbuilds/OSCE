export interface ExaminerModel {
  name: string;
  active: boolean;
  userName: string;
  email: string;
  leader: boolean;
  phone: string;
  procedureId: string;
  procedureName: string;
}

export interface ProcedureModel {

    examId: string,
    examinerId: string,
    procedureId: string,
    programId: string

}