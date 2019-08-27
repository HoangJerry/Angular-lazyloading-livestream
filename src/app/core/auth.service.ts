import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Response } from "@angular/http";
import { HttpClient } from "./http-client.service";
import { Logger } from "./logger.service";
import { environment } from "../../environments/environment";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class AuthService {
  public model = {};
  private loggedIn = false;
  private user = "";
  private user_email = "";
  private user_profile = "";

  constructor(
    @Inject(Router) public router: Router,
    private http: HttpClient,
    private logger: Logger
  ) {
    this.loggedIn = !!localStorage.getItem("access_token");
    if (this.loggedIn) {
      this.user = localStorage.getItem("user");
      this.user_email = localStorage.getItem("user_email");
      this.checkExpire();
    }
  }

  /**
   * Take user to dashboard
   */
  public goToDashboard() {
    this.router.navigate(["/browse"]);
    return false;
  }

  /**
   * Log user in
   */
  public login(email: string, password: string) {
    // TODO - Switch from Grant Type: Resource Owner Password Credentials to an Implicit Grant Type
    const toUrlEncoded = obj =>
      Object.keys(obj)
        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
        .join("&");
    let formData: any = {
      grant_type: "password",
      username: email,
      password: password,
      client_id: environment.credentials.CLIENT_ID,
      client_secret: environment.credentials.CLIENT_SECRET
    };
    formData = toUrlEncoded(formData);
    return this.http.postForm("/v2/auth/token/", formData).pipe(
      map(res => res.json()),
      map(res => {
        if (res.access_token) {
          localStorage.setItem("access_token", res.access_token);

          // set expire
          let expires_at = new Date();
          expires_at.setSeconds(expires_at.getSeconds() + res.expires_in);
          localStorage.setItem("expires_at", String(expires_at.getTime()));

          this.loggedIn = true;
        }
        return this.loggedIn;
      }),
      catchError(this.http.handleError)
    );
  }

  /**
   * V2 user pk and email
   */

  public getUserID(email: string) {
    return this.http.get("/v2/users/lookup/" + email + "/").pipe(
      map(res => res.json()),
      map(res => {
        if (res.pk) {
          localStorage.setItem("user", res.pk);
          localStorage.setItem("user_email", email);
          this.user = res.pk;
          this.user_email = email;
        }
        return this.loggedIn;
      }),
      catchError(this.http.handleError)
    );
  }

  /**
   * V1 user profile_id
   */
  public getUserProfileID(email: string) {
    return this.http.get("/v1/users/userlookup/" + email + "/").pipe(
      map(res => res.json()),
      map(res => {
        if (res.id) {
          localStorage.setItem("user_profile", res.id);
          this.user_profile = res.id;
        }
        return this.loggedIn;
      }),
      catchError(this.http.handleError)
    );
  }

  /**
   * Add to Login Count for device.
   */

  public getCurrentDevice() {
    let user = localStorage.getItem("user");
    return this.http
      .get("/v2/users/" + user + "/account/devices/current/")
      .subscribe(() => {});
  }

  /**
   * Log user out
   */
  public logout() {
    localStorage.getItem("access_token");
    this.clearUser();
    return false;
  }

  /**
   * Check if user is logged in
   */
  public isLoggedIn() {
    return this.loggedIn;
  }

  /**
   * Get ID of logged user
   */
  public getLoggedUser() {
    if (this.checkExpire()) {
      return "";
    }
    return this.user;
  }

  /**
   * Get email of logged user
   */
  public getLoggedUserEmail() {
    if (this.checkExpire()) {
      return "";
    }
    return this.user_email;
  }

  /**
   * Get logged in user v1 profile id
   */
  public getLoggedUserData() {
    let user_profile = localStorage.getItem("user_profile");
    return this.http.get("/v1/users/" + user_profile + "/").pipe(
      map(res => res.json()),
      catchError(this.http.handleError)
    );
  }

  public getLoggedUserV1() {
    if (this.checkExpire()) {
      return "";
    }
    return this.user_profile;
  }

  /**
   * Clear user storage
   */
  private clearUser() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user");
    localStorage.removeItem("user_email");
    localStorage.removeItem("signUpFlow");
    localStorage.removeItem("user_profile");
    this.loggedIn = false;
    this.user = "";
    this.user_email = "";
    this.user_profile = "";
    this.router.navigate(["/login"]);
  }

  /**
   * Extract data
   */
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  /**
   * Check expire
   * If true, log user out
   */
  private checkExpire() {
    let expires_at = localStorage.getItem("expires_at");
    if (new Date() > new Date(parseInt(expires_at, 10))) {
      this.logout();
      return true;
    }
    return false;
  }
}
