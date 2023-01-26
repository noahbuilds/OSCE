
export interface OsceMonitorCard{
    
        totalObjectivesCompleted: number,
        totalActivitiesCompleted: number,
        programId: string,
        procedureId: string,
        procedureName: string,
        programName: string,
        totalCandidates: number
      
}

export interface OsceMonitor{
    
        programName: string,
        name: string,
        institution: string,
        examNumber: string,
        procedureLists: Array<OsceMonitorProcedure>
      
}

export interface OsceMonitorProcedure{
    
        procedureName: string,
        startTime: string,
        endTime: string,
        examinerName: string
      }
