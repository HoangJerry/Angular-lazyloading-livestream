import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, AbstractControl } from '@angular/forms';

function validateEmailFactory() {
  return (c: AbstractControl): {[key: string]: any} => {
    let EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return EMAIL_REGEXP.test(c.value) ? null : {'mcvodValidateEmail': false};
  };
}

@Directive({
  selector: '[mcvodValidateEmail]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective {

  validator: Function;

  constructor() {
    this.validator = validateEmailFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}
