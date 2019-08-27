import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { APP_NAME, BASE_URL } from "../../app.constants";
import { ProfileService } from "./profile.service";
import { Logger } from "../../core/logger.service";

@Component({
  selector: "mcvod-redeem-gift-card",
  templateUrl: "./redeem-gift-card.html"
})
export class RedeemGiftCardComponent implements OnInit {
  @Input() showRedeemGiftcard: boolean;
  @Output() onRedeemGiftcardClosed = new EventEmitter<boolean>();
  public redeemForm: FormGroup;
  public appName: string;
  public baseURL: string;
  public successMessage: any;
  public errorMessage: any;

  formErrors = {
    code: ""
  };
  validationMessages = {
    code: {
      required: "code is required."
    }
  };

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private logger: Logger
  ) {
    this.appName = APP_NAME;
    this.baseURL = BASE_URL;
    this.successMessage = false;
    this.errorMessage = false;
  }

  ngOnInit(): void {
    this.redeemForm = this.fb.group({
      code: ["", Validators.required]
    });

    // this.redeemForm.valueChanges
    //     .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  /**
   * Go back to previous
   */
  goBack(): void {
    this.showRedeemGiftcard = false;
    this.successMessage = false;
    this.errorMessage = false;
    this.onRedeemGiftcardClosed.emit(this.showRedeemGiftcard);
  }

  /**
   * Redeem giftcard on submitting form
   */
  onSubmit(): void {
    this.onValueChanged(this.redeemForm.value);

    if (this.redeemForm.valid) {
      this.successMessage = false;
      this.errorMessage = false;
      this.profileService
        .redeemGiftCard(this.redeemForm.value)
        .subscribe(
          success => (this.successMessage = true),
          error => (this.errorMessage = <any>error)
        );
    }
  }

  onValueChanged(data?: any) {
    if (!this.redeemForm) {
      return;
    }
    const form = this.redeemForm;
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
