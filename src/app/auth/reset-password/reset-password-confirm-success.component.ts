import { Component } from "@angular/core";
import { APP_NAME, LOGO_COLOR } from "../../app.constants";

@Component({
  selector: "mcvod-reset-password-confirm-success",
  templateUrl: "./reset-password-confirm-success.html"
})
export class ResetPasswordConfirmSuccessComponent {
  public appName: string;
  public logo: string;

  constructor() {
    this.appName = APP_NAME;
    this.logo = LOGO_COLOR;
  }
}
