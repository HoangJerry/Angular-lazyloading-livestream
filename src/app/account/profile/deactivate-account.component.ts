import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { APP_NAME, LOGO_COLOR } from "../../app.constants";
import { ProfileService } from "./profile.service";

@Component({
  selector: "mcvod-deactivate-account",
  templateUrl: "./deactivate-account.html"
})
export class DeactivateAccountComponent implements OnInit {
  @Input() showDeactivateAccountForm: boolean;
  @Output() onDeactivateAccountFormClosed = new EventEmitter<boolean>();
  @Output() onDeactivateAccountSuccessOpened = new EventEmitter<boolean>();
  public deactivateAccountForm: FormGroup;
  public appName: string;
  public errorMessage: any;

  formErrors = {
    password: ""
  };

  validationMessages = {
    password: {
      required: "password is required."
    }
  };

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {
    this.appName = APP_NAME;
  }

  ngOnInit(): void {
    this.deactivateAccountForm = this.fb.group({
      password: ["", Validators.required]
    });

    // this.deactivateAccountForm.valueChanges
    //     .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  /**
   * Close deactivate account modal
   */
  closeDeactivateAccountForm(): void {
    this.showDeactivateAccountForm = false;
    this.onDeactivateAccountFormClosed.emit(this.showDeactivateAccountForm);
  }

  /**
   * Deactivate account on submitting form
   */
  onSubmit(): void {
    this.onValueChanged(this.deactivateAccountForm.value);

    if (this.deactivateAccountForm.valid) {
      this.profileService.unsubscribe().subscribe(
        result => {
          this.showDeactivateAccountForm = false;
          this.onDeactivateAccountFormClosed.emit(
            this.showDeactivateAccountForm
          );
          this.onDeactivateAccountSuccessOpened.emit(true);
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    }
  }

  onValueChanged(data?: any) {
    if (!this.deactivateAccountForm) {
      return;
    }
    const form = this.deactivateAccountForm;
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
