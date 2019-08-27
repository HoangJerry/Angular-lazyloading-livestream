import { Injectable } from "@angular/core";

@Injectable()
export class Logger {
  logs: string[] = []; // capture logs for testing
  errors: string[] = []; // capture error logs for testing

  log(message: string) {
    this.logs.push(message);
    console.log(message);
  }

  error(message: string) {
    this.errors.push(message);
    console.log(message);
  }
}
