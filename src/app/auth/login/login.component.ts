import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../core/auth.service";
import { Logger } from "../../core/logger.service";
import { User } from "../user";
import { APP_NAME, LOGO_COLOR, DONATE } from "../../app.constants";

@Component({
  selector: "mcvod-login",
  //templateUrl: './login.html'
  templateUrl: "./login.component.html"
  //styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public result: any;
  public errorMessage: any;
  public model: User;
  public loginForm: FormGroup;
  public appName: string;
  public donate: string;
  public logo: string;
  public email: any;

  formErrors = {
    email: "",
    password: ""
  };

  validationMessages = {
    email: {
      required: "Email is required.",
      mcvodValidateEmail: "Email is not valid."
    },
    password: {
      required: "Password is required.",
      minlength: "Password must be at least 8 characters long."
    }
  };

  constructor(
    private authService: AuthService,
    private logger: Logger,
    private fb: FormBuilder
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
    if (localStorage.getItem("user_email")) {
      this.email = localStorage.getItem("user_email");
    }
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)])
      ]
    });

    // this.loginForm.valueChanges
    //     .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  /**
   * Log user in on submitting form
   */
  onSubmit(value: any) {
    this.onValueChanged(value);
    if (this.loginForm.valid) {
      //extract the values from the form
      this.authService.login(value.email, value.password).subscribe(
        result => {
          if (result) {
            //set the user and user email in the local storage.
            this.authService.getUserID(value.email).subscribe(
              userDetail => {
                if (userDetail) {
                  this.authService
                    .getUserProfileID(value.email)
                    .subscribe(userInfo => {
                      if (userInfo) {
                        //takes the user to the dashboard
                        this.authService.goToDashboard();
                        //sets the login count.
                        this.authService.getCurrentDevice();
                      }
                    });
                }
              },
              error => {
                this.logger.error(error);
              }
            );
          }
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    }
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + " ";
            }
          }
        }
      }
    }
  }
}
