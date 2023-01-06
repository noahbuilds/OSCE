import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

// Counter
import { CountToModule } from 'angular-count-to';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ClientLogoComponent } from './landing/client-logo/client-logo.component';
import { ServicesComponent } from './landing/services/services.component';
import { CollectionComponent } from './landing/collection/collection.component';
import { CtaComponent } from './landing/cta/cta.component';
import { DesignedComponent } from './landing/designed/designed.component';
import { PlanComponent } from './landing/plan/plan.component';
import { FaqsComponent } from './landing/faqs/faqs.component';
import { ReviewComponent } from './landing/review/review.component';
import { CounterComponent } from './landing/counter/counter.component';
import { WorkProcessComponent } from './landing/work-process/work-process.component';
import { TeamComponent } from './landing/team/team.component';
import { ContactComponent } from './landing/contact/contact.component';
import { FooterComponent } from './landing/footer/footer.component';
import { ScrollspyDirective } from './scrollspy.directive';
import {AppHttpService} from "./app-http.service";
import { PassageService } from './passage-service/passage.service';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    ClientLogoComponent,
    ServicesComponent,
    CollectionComponent,
    CtaComponent,
    DesignedComponent,
    PlanComponent,
    FaqsComponent,
    ReviewComponent,
    CounterComponent,
    WorkProcessComponent,
    TeamComponent,
    ContactComponent,
    FooterComponent,
    ScrollspyDirective
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    NgbAccordionModule,
    SwiperModule,
    CountToModule, 
    HttpClientModule
  ],
  providers: [
    AppHttpService, PassageService
  ],
  exports: [BreadcrumbsComponent, ClientLogoComponent, ServicesComponent, CollectionComponent, CtaComponent, DesignedComponent, PlanComponent, FaqsComponent, ReviewComponent, CounterComponent, WorkProcessComponent, TeamComponent, ContactComponent, FooterComponent, ScrollspyDirective]
})
export class SharedModule { }
