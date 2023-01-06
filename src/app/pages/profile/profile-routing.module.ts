import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MyProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
