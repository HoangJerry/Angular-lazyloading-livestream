import { Injectable } from '@angular/core';
import { Logger } from '../../core/logger.service';
import { ResetEmail } from './reset-email';
import { HttpClient } from '../../core/http-client.service';
import { map, catchError } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable()
export class ResetPasswordService {

  public model: any;

  constructor(private logger: Logger, private http: HttpClient) {
    this.model = new ResetEmail('');
  }

  /**
   * Reset password
   */
  public reset(model: any) {

    return this.http
      .post(
        '/v1/users/auth/password/reset/',
        model
      )
      .pipe(
          map(res => res.json()),
          catchError(this.http.handleError),
      );

  }

  public forgotPassword(email) {
    const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
    let formData: any = {
      "email": email,
      "CLIENT_ID": environment.credentials.CLIENT_ID,
      "CLIENT_SECRET": environment.credentials.CLIENT_SECRET,
    };
    formData = toUrlEncoded(formData);
    return this.http
      .postForm("/v2/users/password/reset_request/", formData)
      .pipe(
        map(res => res.json()),
        map(res => {
          return res;
        }),
        catchError(this.http.handleError)
      );
  }

  /**
   * Reset password confirm
   */
  public resetConfirm(uid: any, token: string, password: any) {

    return this.http
      .post(
        '/v2/users/password/reset_confirm/',
        {'uid': uid, 'token': token, 'new_password1': password, 'new_password2': password}
      )
      .pipe(
        map(res => res.json()),
        catchError(this.http.handleError),
      );
  }
}
