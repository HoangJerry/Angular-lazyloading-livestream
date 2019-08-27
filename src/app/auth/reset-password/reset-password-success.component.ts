import { Component } from '@angular/core';
import { APP_NAME, LOGO_COLOR } from '../../app.constants';

@Component({
  selector: 'mcvod-reset-password-success',
  templateUrl: './reset-password-success.html'
})
export class ResetPasswordSuccessComponent {
  public appName: string;
  public logo: string;

  constructor() {
    this.appName = APP_NAME;
    this.logo = LOGO_COLOR;
  }
}
