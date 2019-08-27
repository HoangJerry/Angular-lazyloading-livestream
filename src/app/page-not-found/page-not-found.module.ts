import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found.component';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PageNotFoundRoutingModule
  ],
  declarations: [
    PageNotFoundComponent
  ],
  providers: []
})

export class PageNotFoundModule {}
