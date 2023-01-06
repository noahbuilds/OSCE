import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDropdownModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
  NgbNavModule,
  NgbTooltipModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SimplebarAngularModule } from 'simplebar-angular';

import { ProfileRoutingModule } from './profile-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [MyProfileComponent, EditProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    NgSelectModule,
    FlatpickrModule,
    SimplebarAngularModule,
  ],
})
export class ProfileModule {}
