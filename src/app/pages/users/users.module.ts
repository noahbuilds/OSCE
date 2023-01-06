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
//import { MomentConstructor} from "moment";

import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    UserComponent,
    AddUserComponent,
    ViewUserComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SimplebarAngularModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbNavModule,
    NgSelectModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    FlatpickrModule,
  ],
})
export class UsersModule {}
