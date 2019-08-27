import { Injectable } from '@angular/core';
import { HttpClient } from '../../core/http-client.service';
import { AuthService } from '../../core/auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HistoryService {

  public model = {};

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  /**
   * Get viewing history
   */
  public getViewingHistory() {
    let user_profile = localStorage.getItem("user_profile");
    return this.http
      .get('/v1/users/' + user_profile + '/history/')
      .pipe(
        map(res => res.json()),
        catchError(this.http.handleError),
      );
  }

  /**
   * Delete history
   */
  public deleteHistory(history_id: string) {
    let user_profile = localStorage.getItem("user_profile");
    return this.http
      .delete('/v1/users/' + user_profile + '/history/' + history_id + '/')
      .pipe(
        map(this.http.extractData),
        catchError(this.http.handleError),
      );
  }
}
