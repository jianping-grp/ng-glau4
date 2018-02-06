import {AbstractControl, FormControl, Validators, NG_VALIDATORS, Validator, ValidatorFn} from "@angular/forms";
import {Directive, Input} from "@angular/core";

export function  phoneNumberValidation(control: AbstractControl): Validators{
  let phoneNumber_RegExp = /^1(3|4|5|7|8)\d{9}$/;
  return phoneNumber_RegExp.test(control.value) ?
    null : {'phoneNumberValidation': { value: control.value}}
}

@Directive({
  selector:'[phoneNumberValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: PhoneNumberValidationDirective, multi: true}]
})

export class PhoneNumberValidationDirective implements Validator {
  @Input() phoneNumberValidation : string;

  validate(control: AbstractControl): {[key: string]: any} {
    return this.phoneNumberValidation ?
      null : {'phoneNumberValidation': {value: control.value}}
  }

}
