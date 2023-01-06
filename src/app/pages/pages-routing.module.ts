import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layouts/layout.component';

// Component pages
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    /* loadChildren: () =>
      import('./dashboards/dashboards.module').then((m) => m.DashboardsModule), */
    component: DashboardComponent,
  },
  
  {
    path: 'examiner',
    component: LayoutComponent,
    loadChildren: ()=> import('./examiner/examiner.module').then((m)=> m.ExaminerModule)
  },
  {
    path: 'candidate',
    loadChildren: ()=> import('./candidate/candidate.module').then((m)=> m.CandidateModule)
  },
  {
    path: 'manager',
    component: LayoutComponent,
    loadChildren: ()=> import('./exam-manager/exam-manager.module').then((m)=> m.ExamManagerModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
