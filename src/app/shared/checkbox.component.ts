import { Component, Input } from '@angular/core';

@Component({
  selector: 'mcvod-checkbox',
  template: `<div class="svod-checkbox">
              <i class="fa fa-square" [class.active]="!selected"></i>
              <i class="fa fa-check-square" [class.active]="selected"></i>
            </div>`
})
export class CheckboxComponent {
  @Input() selected: boolean;
}
