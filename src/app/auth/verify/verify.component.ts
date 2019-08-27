import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AccountService } from "../../account/account.service";
import { AuthService } from "../../core/auth.service";
import { User } from "../user";
import { APP_NAME, LOGO_COLOR, DONATE } from "../../app.constants";
import { Modal } from "ngx-modal";
import { Logger } from "../../core/logger.service";
import { ToastrService } from "ngx-toastr";
import { SignupService } from "../../auth/signup/signup.service";
import { EqualPasswordsValidator } from "../../validators/equal-password.validator";
import { EmailValidator } from "../../validators/email-validator";
import { Location } from "@angular/common";

@Component({
  selector: "mcvod-verify",
  templateUrl: "./verify.component.html"
})
export class VerifyComponent implements OnInit {
  public result: any;
  public errorMessage: any;
  public model: User;
  public loginForm: FormGroup;
  public appName: string;
  public donate: string;
  public logo: string;
  public email: any;
  public setPasswordForm: FormGroup;
  public passValid: boolean = false;
  public showPassword: boolean = false;
  public showRePassword: boolean = false;
  public firstNamePasswordAreSame: boolean = false;
  @ViewChild("setPassword") setPassword: Modal;

  constructor(
    private authService: AuthService,
    private logger: Logger,
    private accountService: AccountService,
    private toastr: ToastrService,
    private signupService: SignupService,
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute
  ) {
    if (this.authService.isLoggedIn()) {
      this.authService.goToDashboard();
    }
    this.model = new User();
    this.errorMessage = false;
    this.appName = APP_NAME;
    this.logo = LOGO_COLOR;
    this.donate = DONATE;
  }

  ngOnInit(): void {
    this.setPasswordFormMethod();

    if (
      this.route.snapshot.params["uid"] &&
      this.route.snapshot.params["token"] // set email
    ) {
      this.setPassword.open();
    }
  }

  /**
   * Initialize the set passowrd form
   */
  setPasswordFormMethod() {
    this.setPasswordForm = this.fb.group({
      // userEmail: [
      //   this.email,
      //   Validators.compose([Validators.required, EmailValidator.validate])
      // ],
      firstName: ["", Validators.compose([Validators.required])],
      passwords: this.fb.group(
        {
          password: [
            "",
            Validators.compose([Validators.required, Validators.minLength(8)])
          ],
          confirm_password: [
            "",
            Validators.compose([Validators.required, Validators.minLength(8)])
          ]
        },
        {
          validator: EqualPasswordsValidator.validate(
            "password",
            "confirm_password"
          )
        }
      )
    });
  }

  /**
   * Check the password validation whether it is letter mix or not
   */
  passwordValidation(event) {
    this.passValid = false;
    if (/[a-zA-Z]/.test(event.target.value)) {
      this.passValid = true;
    }
  }

  /**
   * To match the first name and the password field
   */
  userNamePassMatch() {
    if (this.passValid) {
      this.firstNamePasswordAreSame = false;
      if (
        this.setPasswordForm.get("firstName").value ===
        this.setPasswordForm.get("passwords").get("password").value
      ) {
        this.firstNamePasswordAreSame = true;
      }
    }
  }

  /**
   * Submit button activate (lets go!)
   */
  onSubmit(values) {
    let data = {
      password: values.passwords.password,
      confirm_password: values.passwords.confirm_password,
      uid: this.route.snapshot.params["uid"],
      token: this.route.snapshot.params["token"]
    };
    this.accountService.setPasswordService(data).subscribe(
      result => {
        if (result && result.success) {
          this.toastr.success(
            "Your account has been activated. Password set successfully"
          );
          this.setPassword.close();
          this.location.replaceState("login");
        }
      },
      error => {
        if (error && error.token && error.token[0]) {
          this.toastr.error("Invalid link or this link has been expired");
          this.setPassword.close();
          this.location.replaceState("login");
        }
      }
    );
  }
}
