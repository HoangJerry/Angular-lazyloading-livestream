import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { APP_NAME, LOGO_COLOR } from "../../app.constants";
import { ProfileService } from "./profile.service";
import { AccountService } from "../account.service";
import { Logger } from "../../core/logger.service";

@Component({
  selector: "mcvod-change-username",
  templateUrl: "./change-username.html"
})
export class ChangeUsernameComponent implements OnInit {
  @Input() showChangeUsername: boolean;
  @Input() user: any;
  @Output() onChangeUsernameClosed = new EventEmitter<boolean>();
  @Output() onChangeUsernameSubmitted = new EventEmitter<boolean>();
  public changeUsernameForm: FormGroup;
  public appName: string;
  public errorMessage: any;

  formErrors = {
    userEmail: ""
  };

  validationMessages = {
    userEmail: {
      required: "email is required."
    }
  };

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private logger: Logger,
    private accountService: AccountService
  ) {
    this.appName = APP_NAME;
  }

  ngOnInit(): void {
    this.changeUsernameForm = this.fb.group({
      userEmail: [this.user.userEmail, Validators.required]
    });

    // this.editProfileForm.valueChanges
    //     .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  /**
   * Close edit profile modal
   */
  closeChangeUsername(): void {
    this.showChangeUsername = false;
    this.onChangeUsernameClosed.emit(this.showChangeUsername);
  }

  /**
   * Save profile on submitting form
   */
  onSubmit(): void {
    this.onValueChanged(this.changeUsernameForm.value);

    if (this.changeUsernameForm.valid) {
      this.profileService.saveProfile(this.changeUsernameForm.value).subscribe(
        result => {
          if (result) {
            this.closeChangeUsername();
            this.onChangeUsernameSubmitted.emit(
              this.changeUsernameForm.value.userEmail
            );
          }
        },
        error => {
          this.errorMessage = <any>error;
          this.logger.error(error);
        }
      );
    }
  }

  onValueChanged(data?: any) {
    if (!this.changeUsernameForm) {
      return;
    }
    const form = this.changeUsernameForm;
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
