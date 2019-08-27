import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, Observable } from "rxjs";
import { HttpClient } from "../core/http-client.service";
import { Logger } from "../core/logger.service";
import { AuthService } from "../core/auth.service";
import { map, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class AccountService {
  public user: any;
  public user_profile: any;
  public userChangedAnnounced$: Observable<any>;
  private userChanged: Subject<any> = new Subject<any>();

  constructor(
    private logger: Logger,
    @Inject(Router) public router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.userChangedAnnounced$ = this.userChanged.asObservable();
    this.user = null;
    this.user_profile = null;
  }

  /**
   * Get logged in user
   */
  public getLoggedUser() {
    this.authService.getLoggedUserV1();
    return this.http.get("/v2/users/" + this.user_profile + "/").pipe(
      map(res => res.json()),

      catchError(this.http.handleError)
    );
  }

  /**
   * Assign user to service
   */
  public assignUser(user: any) {
    this.user = user;
    this.userChanged.next(user);
  }

  /**
   * To verify & activate the user on the /login page
   */
  public setPasswordService(values) {
    const toUrlEncoded = obj =>
      Object.keys(obj)
        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
        .join("&");
    let formData: any = {
      CLIENT_ID: environment.credentials.CLIENT_ID,
      CLIENT_SECRET: environment.credentials.CLIENT_SECRET,
      uid: values.uid,
      token: values.token,
      new_password1: values.password,
      new_password2: values.confirm_password
    };
    formData = toUrlEncoded(formData);
    return this.http.postForm("/v2/users/activate/", formData).pipe(
      map(res => res.json()),
      map(res => {
        return res;
      }),
      catchError(this.http.handleError)
    );
  }

  /**
   * To verify the user on the /browse page
   */
  public verifyAccountService(values) {
    const toUrlEncoded = obj =>
      Object.keys(obj)
        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
        .join("&");
    let formData: any = {
      CLIENT_ID: environment.credentials.CLIENT_ID,
      CLIENT_SECRET: environment.credentials.CLIENT_SECRET,
      uid: values.uid,
      token: values.token,
      new_password1: values.password,
      new_password2: values.confirm_password
    };
    formData = toUrlEncoded(formData);
    return this.http.postForm("/v2/users/verify_confirm/", formData).pipe(
      map(res => res.json()),
      map(res => {
        return res;
      }),
      catchError(this.http.handleError)
    );
  }
}
