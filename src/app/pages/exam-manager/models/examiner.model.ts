export interface ExaminerModel {
  id:string;
  name: string;
  active: boolean;
  username: string;
  email: string;
  leader: boolean;
  phone: string;
  procedureId: string;
  procedureName: string;
}

export interface ExaminerProcedureModel {

    examId: string,
    examinerId: string,
    procedureId: string,
    programId: string

}

export interface ProcedureModel{
  
    name: string,
    id: string
  
}