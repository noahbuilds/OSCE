import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';

import {
  NgbCarouselModule
} from '@ng-bootstrap/ng-bootstrap';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { LandingRoutingModule } from "./landing-routing.module";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    NgbCarouselModule,
    LandingRoutingModule,
    SharedModule,
    ScrollToModule.forRoot(),
  ]
})
export class LandingModule { }
