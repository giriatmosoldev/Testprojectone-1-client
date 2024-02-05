import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
 providedIn : "root"
}
)
export class ValidatorService {
  constructor() { }

  public passwordMatch(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  public static passwordStrength(control: AbstractControl): ValidationErrors | null {
    if (control.value != null &&
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(control.value as string) &&
      (control.value as string).length != 0) {
      return { passwordStrength: true }
    }
    return null;
  }

  public static phoneNumberValidation(control: AbstractControl): ValidationErrors | null {
    if (!/^[0-9]{10}$/.test(control.value as string) && (control.value as string).length != 0) {
      return { phoneNumberValidation: true }
    }
    return null;
  }




  public static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if (/\s/.test(control.value as string)) {
      return { cannotContainSpace: true }
    }
    return null;
  }

  public static cannotContainOnlySpace(control: AbstractControl): ValidationErrors | null {

    if (/^\s*$/.test(control.value as string) && (control.value as string).length != 0) {
      return { cannotContainOnlySpace: true }
    }
    return null;
  }

  public static duplicateItemValidator(index: number, array: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const arraySet = new Set();

      array.value.forEach((val: any, idx: number) => {
        if (idx !== index) {
          arraySet.add(val.name);
        }
      });

      const isDuplicate = arraySet.has(value.trim().toLowerCase());
      return isDuplicate && (control.value as string).length != 0 ? { isDuplicate } : null;
    }
  }

  public static FormArrayDuplicateValidator(key: string): ValidatorFn {
    return (control: AbstractControl) => {
      const controlArray = control as FormArray;
      if (!controlArray || !controlArray.value)
        return null;


      //setting all control isDuplicate to empty
      //due to angular does not agree with {} we set the errors to null using Set Errors
      // if the keys are empty in errors else we  put in the rest of the errors to it

      controlArray.value.forEach((object: any, index: number) => {

        let errors = controlArray.at(index).get(key)?.errors as ValidationErrors;
        if (errors)
          delete errors['isDuplicate'];

        // angular if we have empty object considers it invalid
        //so if errors is empty set it to null
        //else the remaining errors or may be null if it comes as that itself
        if (errors && Object.keys(errors).length == 0)
          controlArray.at(index).get(key)?.setErrors(null);
        else
          controlArray.at(index).get(key)?.setErrors(errors);
      });

      //here we go through validation of each item with all items
      //where we find the problem(index) we set the index error
      // and which control the first foreach is for there also it sets currentIndex
      //error comes wherever this finds that issue
      controlArray.value.forEach((object: any, currentIndex: number) => {
        if (!controlArray.at(currentIndex).get(key)?.pristine) {
          controlArray.value.forEach((currentArray: any, index: number) => {
            if (currentIndex != index) {
              if (object[key] != null && object[key].trim().length > 0 && currentArray[key] != null && currentArray[key].trim().length > 0)
                if (object[key].toLowerCase() == currentArray[key].toLowerCase()) {
                  let errors = controlArray.at(+index).get(key)?.errors as ValidationErrors;
                  let currentIndexerrors = controlArray.at(+currentIndex).get(key)?.errors as ValidationErrors;
                  if (errors == null)
                    errors = {};
                  if (currentIndexerrors == null)
                    currentIndexerrors = {};



                  errors["isDuplicate"] = true;
                  currentIndexerrors["isDuplicate"] = true;
                  controlArray.at(+index).get(key)?.setErrors(errors);
                  controlArray.at(+currentIndex).get(key)?.setErrors(currentIndexerrors);
                }
            }
          })
        };
      });

      return null;
    }
  }

}
