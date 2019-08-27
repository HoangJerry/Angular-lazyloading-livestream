import { throwError as observableThrowError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { environment } from "../../environments/environment";
import { LoadingService } from "./loading.service";
import { tap } from "rxjs/operators";

@Injectable()
export class HttpClient {
  constructor(private http: Http, private loading: LoadingService) {
    this.http = http;
  }

  /**
   * Create authorization header
   */
  createAuthorizationHeader(headers: Headers) {
    let access_token = localStorage.getItem("access_token");
    if (access_token) {
      headers.append("Authorization", "Bearer " + access_token);
    }
  }

  /**
   * Get method
   */
  //
  get(url: string) {
    this.loading.start();
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    this.createAuthorizationHeader(headers);
    return this.http
      .get(environment.credentials.HOST + url, {
        headers: headers
      })
      .pipe(
        tap(
          data => {
            this.loading.stop();
          },
          error => {
            this.loading.stop();
          }
        )
      );
  }

  /**
   * Post method
   */
  post(url: string, data: any) {
    this.loading.start();
    let headers = new Headers({ "Content-Type": "application/json" });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(environment.credentials.HOST + url, data, options)
      .pipe(
        tap(
          data => {
            this.loading.stop();
          },
          error => {
            this.loading.stop();
          }
        )
      );
  }

  /**
   * Put method
   */
  put(url: string, data: any) {
    let headers = new Headers({ "Content-Type": "application/json" });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(environment.credentials.HOST + url, data, options);
  }

  /**
   * Delete method
   */
  delete(url: string) {
    this.loading.start();
    let headers = new Headers({ "Content-Type": "application/json" });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(environment.credentials.HOST + url, options).pipe(
      tap(
        data => {
          this.loading.stop();
        },
        error => {
          this.loading.stop();
        }
      )
    );
  }

  /**
   * Post method with form data
   * For some requests use x-www-form-urlencoded header
   */
  postForm(url: string, data: any) {
    this.loading.start();
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(environment.credentials.HOST + url, data, options)
      .pipe(
        tap(
          data => {
            this.loading.stop();
          },
          error => {
            this.loading.stop();
          }
        )
      );
  }

  /**
   * Handle request error
   */
  public handleError(error: Response | any) {
    // in a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || {};
      const err = body.error || body;
      errMsg = err;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return observableThrowError(errMsg);
  }

  public extractData(res: Response) {
    let body;

    // check if empty, before call json
    if (res.text()) {
      body = res.json();
    }

    return body || {};
  }

   /**
   * Get live stream video
   */
  public getLiveStream() {
    return this.http.get(environment.credentials.HOST+"/v2/content/livestreams/")
  }
}
