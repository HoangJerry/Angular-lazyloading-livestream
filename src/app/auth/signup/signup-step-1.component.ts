import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { APP_NAME, LOGO_COLOR } from "../../app.constants";
import { SignupService } from "./signup.service";
import { Logger } from "../../core/logger.service";
import { AuthService } from "../../core/auth.service";
import { EmailValidator } from "../../validators/email-validator";
import { LoadingService } from "../../core/loading.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "mcvod-signup-step-1",
  templateUrl: "./signup-step-1.html"
})
export class SignupStep1Component implements OnInit {
  public signUpForm: FormGroup;
  public ismobileViewSignUp: boolean = false;
  public messages = {};

  constructor(
    @Inject(SignupService) private signupService: SignupService,
    private fb: FormBuilder,
    private logger: Logger,
    private authService: AuthService,
    private loading: LoadingService,
    private toastr: ToastrService
  ) {
    if (this.authService.isLoggedIn()) {
      this.authService.goToDashboard();
    }
    this.ismobileViewSignUp = window.innerWidth <= 768 ? true : false;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    document.body.style.backgroundColor = "#FFFFFF";
    this.signUpForm = this.fb.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.validate])
      ]
    });
    localStorage.removeItem("user_email");
  }

  /**
   * Signup user and go to the next step on submitting form
   */
  onSubmit(values) {
    this.signupService.signUpUser(values.email).subscribe(
      result => {
        this.messages = {};
        if (result) {
          this.signUpForm.reset();
          if (result.pk) {
            this.authService
              .login(result.email, "preview" + result.pk)
              .subscribe(
                result => {
                  if (result) {
                    this.authService.getUserID(values.email).subscribe(
                      userDetail => {
                        if (userDetail) {
                          this.authService.getUserProfileID(values.email).subscribe(
                            userDetail => {
                              if (userDetail) {
                                localStorage.setItem("signUpFlow", "true");
                                this.authService.goToDashboard();
                                // set the current device 
                                this.authService.getCurrentDevice();
                              }
                            }
                          )
                        }
                      },
                      error => {
                        this.logger.error(error);
                      }
                    );
                  }
                },
                error => {
                  this.logger.error(error);
                }
              );
          }
        }
        this.messages["verifiedUser"] = false;
        this.messages["unverifiedUser"] = false;
      },
      error => {
        this.logger.error(error);
        if (error.email[0] === "Active unverified user. (resend?).") {
          this.messages["unverifiedUser"] = true;
          this.messages["verifiedUser"] = false;
        } else if (error.email[0] === "Active verified user. (login).") {
          this.messages["verifiedUser"] = true;
          this.messages["unverifiedUser"] = false;
          localStorage.setItem("user_email", values.email);
        }
      }
    );
  }

  /**
   * On resizing the window
   */
  onWindowResizeSignUp(event) {
    this.ismobileViewSignUp = window.innerWidth <= 768 ? true : false;
  }

  /**
   * for closing the messages
   */
  closeIcon() {
    this.messages = {};
  }

  /**
   * resend the verification mail
   */
  resendVerificationMail(values) {
    if (values && values.email) {
      this.signupService.resendVerificationMail(values.email).subscribe(
        result => {
          this.toastr.success(
            "Please check your email for a verification email from us do-not-reply@corco.com"
          );
          this.messages = {};
          this.signUpForm.reset();
        },
        error => {
          this.logger.error(error);
        }
      );
    }
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = "#F6F3F9";
  }
}
