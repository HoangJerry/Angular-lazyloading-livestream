import { NgModule }       from '@angular/core';
import { SharedModule }  from '../shared/shared.module';
import { TermsOfUseComponent } from './terms-of-use.component';
import { PrivacyComponent } from './privacy.component';
import { StaticPageService } from './static-page.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    TermsOfUseComponent,
    PrivacyComponent
  ],
  providers: [
    StaticPageService
  ],
  exports: [
    TermsOfUseComponent,
    PrivacyComponent
  ],
})

export class StaticPageModule {}
