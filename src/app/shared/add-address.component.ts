import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { APP_NAME, LOGO_COLOR, HELP_CONTACT } from '../app.constants';
import { ProfileService } from '../account/profile/profile.service';
import { AccountService } from '../account/account.service';
import { Logger }     from '../core/logger.service';

@Component({
  selector: 'mcvod-add-address',
  templateUrl: './add-address.html'
})
export class AddAddressComponent implements OnInit {
  @Input() showAddAddress: boolean;
  @Input() firstAddAddress: boolean;
	@Input() user: any;
  @Output() onAddAddressClosed = new EventEmitter<boolean>();
  public addAddressForm: FormGroup;
  public appName: string;
  public errorMessage: string;
  public helpContact: string;

  formErrors = {
    'address1': '',
    'city': '',
    'province': '',
    'regionCode': '',
    'country': '',
  };

  validationMessages = {
    'address1': {
      'required': 'address is required.'
    },
    'city': {
      'required': 'city is required.'
    },
    'province': {
      'required': 'province is required.'
    },
    'regionCode': {
      'required': 'postal code is required.'
    },
    'country': {
      'required': 'country is required.'
    },
  };

  constructor(private location: Location, private fb: FormBuilder, private profileService: ProfileService,
    private logger: Logger, private accountService: AccountService) {
    this.appName = APP_NAME;
    this.helpContact = HELP_CONTACT;
  }

  ngOnInit(): void {
    this.addAddressForm = this.fb.group({
      'address1': [this.user.address1, Validators.required],
      'city': [this.user.city, Validators.required],
      'province': [this.user.province, Validators.required],
      'regionCode': [this.user.regionCode, Validators.required],
      'country': [this.user.country, Validators.required],
    });

    // this.addAddressForm.valueChanges
    //     .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  /**
   * Close deactivate account modal
   */
  closeDeactivateAccountForm(): void {
    if (this.firstAddAddress)
      this.onValueChanged(this.addAddressForm.value);

    if (this.addAddressForm.valid || !this.firstAddAddress) {
      this.showAddAddress = false;
      this.onAddAddressClosed.emit(this.showAddAddress);

      this.user.address1 = this.addAddressForm.value.address1;
      this.user.city = this.addAddressForm.value.city;
      this.user.province = this.addAddressForm.value.province;
      this.user.regionCode = this.addAddressForm.value.regionCode;
      this.user.country = this.addAddressForm.value.country;
      this.accountService.assignUser(this.user);
    }
  }

  /**
   * Save address on submitting form
   */
  onSubmit(): void {
    this.onValueChanged(this.addAddressForm.value);

    if (this.addAddressForm.valid) {
      this.profileService.saveAddress(this.addAddressForm.value)
        .subscribe(
          (result) => {
            this.closeDeactivateAccountForm();
          },
          (error) => {
            this.errorMessage = <any>error;
          }
        );
    }
  }

  onValueChanged(data?: any) {
    if (!this.addAddressForm) { return; }
    const form = this.addAddressForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}

