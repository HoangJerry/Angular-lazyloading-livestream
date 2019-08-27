import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { APP_NAME, BASE_URL } from "../../app.constants";
import { ProfileService } from "./profile.service";
import { StaticPageService } from "../../static-pages/static-page.service";

@Component({
  selector: "mcvod-gift-card-form",
  templateUrl: "./gift-card-form.html"
})
export class GiftCardFormComponent implements OnInit {
  @Input() showGiftcardForm: boolean;
  @Output() onGiftcardFormClosed = new EventEmitter<boolean>();
  public giftcardForm: FormGroup;
  public appName: string;
  public baseURL: string;
  public showTermsOfUse: boolean;

  formErrors = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    sendEmail: ""
  };

  validationMessages = {
    firstName: {
      required: "first name is required."
    },
    lastName: {
      required: "last name is required."
    },
    email: {
      required: "email is required."
    },
    message: {
      required: "message is required."
    },
    sendEmail: {
      required: "send email is required."
    }
  };

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private staticPageService: StaticPageService
  ) {
    this.appName = APP_NAME;
    this.baseURL = BASE_URL;
  }

  ngOnInit(): void {
    this.giftcardForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      message: ["", Validators.required],
      sendEmail: [false, Validators.required]
    });

    // this.giftcardForm.valueChanges
    //     .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  /**
   * Close giftcard modal
   */
  closeGiftcardForm(): void {
    this.showGiftcardForm = false;
    this.onGiftcardFormClosed.emit(this.showGiftcardForm);
  }

  /**
   * Open terms of use page
   */
  public openTermsOfUse() {
    this.showTermsOfUse = true;
    this.staticPageService.changeTermsOfUse(this.showTermsOfUse);
  }

  /**
   * Save giftcard on submitting form
   */
  onSubmit(): void {
    this.onValueChanged(this.giftcardForm.value);

    if (this.giftcardForm.valid) {
      this.profileService.saveGiftCard(this.giftcardForm.value);
    }
  }

  onValueChanged(data?: any) {
    if (!this.giftcardForm) {
      return;
    }
    const form = this.giftcardForm;
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
