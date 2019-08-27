import { Component } from '@angular/core';
import { APP_NAME, LOGO_COLOR } from '../../app.constants';
import { AuthService } from '../../core/auth.service';
import { SignupService } from './signup.service';

@Component({
  selector: 'mcvod-signup',
  templateUrl: './signup.html',
  providers: [SignupService]
})
export class SignupComponent {
	public text: string;
	public appName: string;

  constructor(private authService: AuthService) {
  	if (this.authService.isLoggedIn()) {
  		this.authService.goToDashboard();
  	}

  	this.text = 'My brand new component!';
    this.appName = APP_NAME;
  }
}
