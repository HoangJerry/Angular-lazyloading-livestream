import { Component, Input } from '@angular/core';

@Component({
  selector: 'mcvod-toggle',
  template: `<div class="svod-checkbox">
              <i class="fa fa-toggle-off" [class.active]="!selected"></i>
              <i class="fa fa-toggle-on" [class.active]="selected"></i>
            </div>`
})
export class ToggleComponent {
  @Input() selected: boolean;
}
