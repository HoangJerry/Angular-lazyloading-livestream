import { Component, Inject, OnInit, NgZone, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { APP_NAME, LOGO_COLOR } from "../../app.constants";
import { SignupService } from "./signup.service";
import { Logger } from "../../core/logger.service";
import { Modal } from "ngx-modal";

@Component({
  selector: "mcvod-signup-step-2",
  templateUrl: "./signup-step-2.html"
})
export class SignupStep2Component implements OnInit {
  public title: string;
  public appName: string;
  public signForm: FormGroup;
  public errorMessage: any;
  public showTermsOfUse: boolean;
  public showPrivacy: boolean;
  public setupYourAccountForm: FormGroup;
  public userEmail: FormGroup;
  show: boolean = false;
  @ViewChild("setupYourAccount") setupYourAccount: Modal;
  formErrors = {
    donationAmount: ""
  };

  validationMessages = {
    donationAmount: {
      required: "Donation amount is required."
    }
  };

  constructor(
    @Inject(SignupService) private signupService: SignupService,
    private logger: Logger,
    private fb: FormBuilder,
    private _zone: NgZone
  ) {
    this.title = "Donation amount";
    this.appName = APP_NAME;
    this.errorMessage = false;
    if (
      this.signupService.model.email === "" ||
      this.signupService.model.password === ""
    ) {
      // this.signupService.goToNextStep('backward');
    }
  }

  ngOnInit(): void {
    this.signForm = this.fb.group({
      donationAmount: [
        this.signupService.model.donationAmount,
        Validators.required
      ]
    });

    this.setupYourAccountForm = this.fb.group({
      userEmail: [],
      name: [""],
      passwords: this.fb.group(
        {
          password: [
            "",
            Validators.compose([Validators.required, Validators.minLength(8)])
          ],
          confirmPassword: [
            "",
            Validators.compose([Validators.required, Validators.minLength(8)])
          ]
        },
        { validator: this.matchingPasswords("password", "confirmPassword") }
      )
    });

    this.signForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
    this.openAccountSetupModal();
  }

  /**
   * select amount
   */
  selectAmount(amount: number) {
    this.signForm.controls["donationAmount"].setValue(amount);
  }

  /**
   * Save donation information on submitting form
   */
  // goToNextStep(): void {
  //   this.signupService.model.check = false;
  //   this.signupService.model.donationAmount = this.signForm.value.donationAmount;
  //   this.signupService.signup(this.signupService.model).subscribe(
  //     result => {
  //       if (result) {
  //         this.signupService.goToNextStep("forward");
  //       }
  //     },
  //     error => {
  //       this.formErrors.donationAmount = error;
  //       this.errorMessage = <any>error;
  //       this.logger.error(error);
  //     }
  //   );
  // }

  onValueChanged(data?: any) {
    if (!this.signForm) {
      return;
    }
    const form = this.signForm;
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

  /**
   * When account setup Modal close
   */
  onCloseAccountSetupModal() {
    this.setupYourAccountForm.reset();
  }

  /**
   *  when click on submit button
   * @param values
   */
  onSubmit(values) {
    console.log("form values", values);
  }

  /**
   * to open setup your account modal
   */
  openAccountSetupModal() {
    this.setupYourAccount.open();
  }

  /**
   * to toggle password show hide
   */
  togglePasswordField() {
    this.show = !this.show;
  }

  matchingPasswords(password: string, confirmPassword: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[password];
      let passwordConfirmationInput = group.controls[confirmPassword];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ mismatch: true });
      }
    };
  }
}
