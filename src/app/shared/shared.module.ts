import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import { EmailValidatorDirective }  from './email-validator.directive';
import { AmountPipe }  from './amount.pipe';
import { TruncatePipe }  from './truncate.pipe';
import { HistoryFilterPipe }  from './history-filter.pipe';
import { CheckboxComponent }  from './checkbox.component';
import { ToggleComponent }  from './toggle.component';
//import { CarouselComponent }  from './carousel.component';
import { CarouselComponent } from "./carousel/carousel.component";
import { AddAddressComponent }  from './add-address.component';
import { GroupPipe }  from './group.pipe';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Library

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

// Add an icon to the library for convenient access in other components
  library.add(faCoffee);

@NgModule({
  imports:      [ CommonModule, ReactiveFormsModule,FontAwesomeModule ],
  declarations: [ EmailValidatorDirective,
                  AmountPipe,
                  TruncatePipe,
                  HistoryFilterPipe,
                  CheckboxComponent,
                  ToggleComponent,
                  CarouselComponent,
                  AddAddressComponent,
                  GroupPipe ],
  exports:      [ EmailValidatorDirective,
                  CommonModule, FormsModule,
                  AmountPipe, TruncatePipe,
                  HistoryFilterPipe,
                  CheckboxComponent, ToggleComponent,
                  CarouselComponent, AddAddressComponent,
                  GroupPipe ]
})
export class SharedModule { }
