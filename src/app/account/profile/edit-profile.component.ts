import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { APP_NAME, LOGO_COLOR } from "../../app.constants";
import { ProfileService } from "./profile.service";
import { AccountService } from "../account.service";
import { Logger } from "../../core/logger.service";

@Component({
  selector: "mcvod-edit-profile",
  templateUrl: "./edit-profile.html"
})
export class EditProfileComponent implements OnInit {
  @Input() showEditProfile: boolean;
  @Input() user: any;
  @Output() onEditProfileClosed = new EventEmitter<boolean>();
  @Output() onEditProfileSubmitted = new EventEmitter<boolean>();
  public editProfileForm: FormGroup;
  public appName: string;
  public errorMessage: any;

  formErrors = {
    firstName: "",
    lastName: "",
    userEmail: ""
  };

  validationMessages = {
    firstName: {
      required: "first name is required."
    },
    lastName: {
      required: "last name is required."
    },
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
    this.editProfileForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      userEmail: [this.user.userEmail, Validators.required]
    });

    // this.editProfileForm.valueChanges
    //     .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  /**
   * Close edit profile modal
   */
  closeEditProfileForm(): void {
    this.showEditProfile = false;
    this.onEditProfileClosed.emit(this.showEditProfile);
  }

  /**
   * Save profile on submitting form
   */
  onSubmit(): void {
    this.onValueChanged(this.editProfileForm.value);

    if (this.editProfileForm.valid) {
      this.profileService.saveProfile(this.editProfileForm.value).subscribe(
        result => {
          if (result) {
            this.closeEditProfileForm();
            this.onEditProfileSubmitted.emit(
              this.editProfileForm.value.userEmail
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
    if (!this.editProfileForm) {
      return;
    }
    const form = this.editProfileForm;
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
