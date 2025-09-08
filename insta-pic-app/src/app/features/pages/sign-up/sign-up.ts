import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../shared/interfaces/user';
import { Auth } from '../../../shared/services/auth';
import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  fb = inject(FormBuilder);

  router = inject(Router);

  authService = inject(Auth);

  ruta = '';

  title = 'Registro de usuario';

  validators = [Validators.required, Validators.minLength(4)];

  signUpForm = this.fb.group(
    {
      username: ['jjzapata', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', this.validators],
      rePassword: ['', this.validators],
    },
    { validators: passwordMatchValidator }
  );

  onSignUp() {
    if (!this.signUpForm.valid) {
      if (this.signUpForm.errors?.['passwordMismatch']) {
        alert('Las contraseñas no coinciden');
        return;
      }
      alert('Faltan campos por diligenciar');
      return;
    }
    let user = this.signUpForm.value as User;

    localStorage.setItem('lastUser', user.username);

    let signUpResponse = this.authService.signUp(user);

    if (!!signUpResponse.success) {
      this.router.navigate([signUpResponse.redirectTo]);
      return;
    }

    alert(signUpResponse.message);
  }
}
