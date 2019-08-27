import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { Subscription } from "rxjs";
import { APP_NAME, SHOW_GIFT_CARD_SECTION } from "../../app.constants";
import { AccountService } from "../account.service";
import { ProfileService } from "./profile.service";
import { Logger } from "../../core/logger.service";

@Component({
  selector: "mcvod-profile",
  templateUrl: "./profile.html"
})
export class ProfileComponent implements OnInit, OnDestroy {
  public appName: string;
  public showGiftcardForm: boolean;
  public showDeactivateAccountForm: boolean;
  public showEditProfile: boolean;
  public showChangeUsername: boolean;
  public showAddAddress: boolean;
  public showSuccessDeactivateAccount: boolean;
  public user: any;
  public subscription: Subscription;
  public showGiftcardSection: boolean;

  public changePasswordForm: FormGroup;
  public errorMessage: any;
  public changePasswordSuccess: boolean;

  formErrors = {
    old_password: "",
    new_password1: "",
    new_password2: ""
  };

  validationMessages = {
    old_password: {
      required: "Email is required."
    },
    new_password1: {
      required: "Password is required.",
      minlength: "Password must be at least 8 characters long."
    },
    new_password2: {
      required: "Confirm Password is required.",
      minlength: "Confirm Password must be at least 8 characters long.",
      mismatch: "Passwords are not the same"
    }
  };

  constructor(
    private location: Location,
    private accountService: AccountService,
    private logger: Logger,
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {
    this.appName = APP_NAME;
    this.showGiftcardSection = SHOW_GIFT_CARD_SECTION;
  }

  ngOnInit(): void {
    this.user = this.accountService.user;
    this.subscription = this.accountService.userChangedAnnounced$.subscribe(
      value => {
        this.user = value;
      }
    );

    this.changePasswordForm = this.fb.group(
      {
        old_password: ["", Validators.required],
        new_password1: [
          "",
          Validators.compose([Validators.required, Validators.minLength(8)])
        ],
        new_password2: [
          "",
          Validators.compose([Validators.required, Validators.minLength(8)])
        ]
      },
      { validator: this.matchingPasswords("new_password1", "new_password2") }
    );

    // this.changePasswordForm.valueChanges
    //     .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  /**
   * Resetting password
   */
  onSubmit(value: any) {
    this.onValueChanged(value);
    this.changePasswordSuccess = false;

    if (this.changePasswordForm.valid) {
      this.profileService.changePassword(value).subscribe(
        result => {
          this.changePasswordSuccess = true;
        },
        error => {
          this.errorMessage = <any>error;
          this.formErrors["old_password"] = "Invalid password";
        }
      );
    }
  }

  /**
   * Gift card
   */
  onGiftcardFormClosed(closed: boolean) {
    this.showGiftcardForm = closed;
  }

  onGiftcardFormOpened(opened: boolean) {
    this.showGiftcardForm = opened;
  }

  /**
   * Deactivate account
   */
  onDeactivateAccountFormClosed(closed: boolean) {
    this.showDeactivateAccountForm = closed;
  }

  showDeactivateAccountBox() {
    this.showDeactivateAccountForm = true;
  }

  onDeactivateAccountSuccessOpened(opened: boolean) {
    this.showSuccessDeactivateAccount = opened;
  }

  closeSuccessDeactivateAccount() {
    this.showSuccessDeactivateAccount = false;
  }

  /**
   * Edit profile
   */
  onEditProfileClosed(closed: boolean) {
    this.showEditProfile = closed;
  }

  showEditProfileBox() {
    this.showEditProfile = true;
  }

  onEditProfileSubmitted(email: string) {
    this.user.userEmail = email;
    this.accountService.assignUser(this.user);
  }

  /**
   * change username
   */
  onChangeUsernameClosed(closed: boolean) {
    this.showChangeUsername = closed;
  }

  showChangeUsernameBox() {
    this.showChangeUsername = true;
  }

  onChangeUsernameSubmitted(email: string) {
    this.user.userEmail = email;
    this.accountService.assignUser(this.user);
  }

  /**
   * Add address
   */
  onAddAddressClosed(closed: boolean) {
    this.showAddAddress = closed;
  }

  showAddAddressBox() {
    this.showAddAddress = true;
  }

  /**
   * Go back to previous page
   */
  goBack(): void {
    this.location.back();
  }

  onValueChanged(data?: any) {
    if (!this.changePasswordForm) {
      return;
    }
    const form = this.changePasswordForm;
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
