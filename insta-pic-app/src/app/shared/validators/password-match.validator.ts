import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(controlPassword: AbstractControl): ValidationErrors | null {
  const password = controlPassword.get('password')?.value;
  const rePassword = controlPassword.get('rePassword')?.value;
  if (password !== rePassword) {
    return { passwordMismatch: true };
  }
  return null;
}
