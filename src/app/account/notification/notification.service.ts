import { Injectable } from '@angular/core';
import { HttpClient } from '../../core/http-client.service';
import { AuthService } from '../../core/auth.service';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class NotificationService {

  public model = {};

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  /**
   * Get notifications settings
   */
  public getNotificationSettings() {
    let user_profile = localStorage.getItem("user_profile");
    return this.http
      .get('/v1/users/' + user_profile + '/userpreferences/').pipe(
        map(res => res.json()),
        catchError(this.http.handleError),
      )
  }

  /**
   * Save user's settings
   */
  public updateSettings(settings: any) {
    let user_profile = localStorage.getItem("user_profile");
    return this.http
      .put('/v1/users/' + user_profile + '/userpreferences/', settings).pipe(
        map(res => res.json()),
        catchError(this.http.handleError)
      )
  }
}
