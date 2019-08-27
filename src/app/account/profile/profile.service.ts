import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '../../core/http-client.service';
import { Logger } from '../../core/logger.service';
import { AuthService } from '../../core/auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ProfileService {

  public model = {};
  private user_id: string;
  private user_profile: string;

  constructor(private logger: Logger, @Inject(Router) public router: Router, private http: HttpClient,
    private authService: AuthService) {
    this.user_profile = localStorage.getItem("user_profile");
  }

  /**
   * Save gift card
   */
  public saveGiftCard(data: any) {
    this.logger.log(data);
  }

  /**
   * Redeem giftcard
   */
  public redeemGiftCard(data: any) {
    return new Observable(observer => {
        setTimeout(() => {
            if (data.code.length === 9) {
              observer.next({success: 'A credit has been added to your account'});
            } else {
              observer.error('Oops, that card number had already been redeemed');
            }
        }, 100);
    });
  }

  /**
   * Save user address
   */
  public saveAddress(data: any) {
    return this.http
      .put(
        '/v1/users/addaddress/' + this.user_profile + '/', data ).pipe(
          map(res => res.json()),
          catchError(this.http.handleError),
        )

  }

  /**
   * Deactivate account
   */
  public deactivateAccount(data: any) {
    this.logger.log(data);
  }

  /**
   * Save user profile
   */
  public saveProfile(data: any) {
    return this.http
      .put(
        '/v1/users/updateaccount/' + this.user_profile + '/', data).pipe(
        map(res => res.json()),
        catchError(this.http.handleError),
      )

  }

  /**
   * Unsubscribe user
   */
  public unsubscribe() {
    return this.http
      .delete('/v1/users/subscription/').pipe(
        map(res => res.json()),
        catchError(this.http.handleError),
      )

  }

  /**
   * Save user profile
   */
  public changePassword(data: any) {
    return this.http
      .post(
        '/v1/users/auth/password/change/', data ).pipe(
        map(res => res.json()),
        catchError(this.http.handleError),
      )
  }
}
