import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from '../../core/logger.service';
import { User } from './user';
import { HttpClient } from '../../core/http-client.service';
import { AuthService } from '../../core/auth.service';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable()
export class SignupService {

  public model: any;
  public baseRoute = '/signup';
  public steps = [
    '',
    'step2',
  ];

  constructor(private logger: Logger, @Inject(Router) public router: Router, private http: HttpClient, private authService: AuthService) {
    this.model = new User('', '', '', null, '', {});
  }

  /**
   * Get first step
   */
  // public getInitialStep() {
  //   this.router.navigate([this.baseRoute + '/' + this.steps[0]]);
  //   return false;
  // }

  /**
   * Go to the next step
   */
  // public goToNextStep (direction: string /* pass 'forward' or 'backward' to service from view */): any {
  // 	this.logger.log('Going to next step ...');
  //   let stepIndex = this.steps.indexOf(this.router.url.split('/')[2]);

  //   if (stepIndex === -1 || stepIndex === this.steps.length) {
  //   	stepIndex = 0;
	//   }

  //   this.router.navigate([this.baseRoute + '/' + this.steps[stepIndex + (direction === 'forward' ? 1 : -1)]]);
  //   return false;
  // }

  /**
   * Log user in and go to dashboard
   */
  // public goToDashboard() {
  //   this.authService.login(this.model.userEmail, this.model.password).subscribe(
  //     (result) => {
  //       if (result) {
  //         this.authService.getUserID(this.model.userEmail)
  //           .subscribe(
  //             (userDetail) => {
  //               if (userDetail) {
  //                 this.authService.goToDashboard();
  //               }
  //             },
  //             (error) => {
  //               this.logger.error(error);
  //             }
  //           );
  //       }
  //     },
  //     (error) => {
  //       this.logger.error(error);
  //     }
  //   );
  // 	return false;
  // }

  /**
   * Check Signup user
   */
  // public checkSignup(model: any) {
  //   model.check = true;
  //   return this.http
  //     .post(
  //       '/v1/users/',
  //       model
  //     )
  //     .pipe(
  //       map(res => res.json()),
  //       catchError(this.http.handleError),
  //     );
  // }

  /**
   * Signup user
   */
  // public signup(model: any) {

  //   return this.http
  //     .post(
  //       '/v1/users/',
  //       model
  //     )
  //     .pipe(
  //       map(res => res.json()),
  //       catchError(this.http.handleError),
  //     );
  // }

  /**
   * SignUp the new user
   */
  public signUpUser(email) {
    const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
    let formData: any = {
      "email": email,
      "CLIENT_ID": environment.credentials.CLIENT_ID,
      "CLIENT_SECRET": environment.credentials.CLIENT_SECRET,
    };
    formData = toUrlEncoded(formData);
    return this.http
      .postForm("/v2/users/signup/", formData)
      .pipe(
        map(res => res.json()),
        map(res => {
          return res;
        }),
        catchError(this.http.handleError)
      );
  }


   /**
   * Add to Login Count for device. 
   */

  public getCurrentDevice() {
    let user = localStorage.getItem("user")
    return this.http
    .get("/v2/users/" + user + "/account/devices/current/")
    .subscribe(() => {
    });
    
  }




  public resendVerificationMail(email) {
    const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
    let formData: any = {
      "email": email,
      "CLIENT_ID": environment.credentials.CLIENT_ID,
      "CLIENT_SECRET": environment.credentials.CLIENT_SECRET,
    };
    formData = toUrlEncoded(formData);
    return this.http
      .postForm("/v2/users/verify_request/", formData)
      .pipe(
        map(res => res.json()),
        map(res => {
          return res;
        }),
        catchError(this.http.handleError)
      );
  }



//   /**
//    * Save stripe information
//    */
//   public stripe(userEmail: string, stripeToken: string) {

//     return this.http
//       .put(
//         '/v1/users/',
//         {userEmail: userEmail, stripeToken: stripeToken}
//       ).pipe(
//         map(res => res.json()),
//         catchError(this.http.handleError),
//       )

//   }
}
