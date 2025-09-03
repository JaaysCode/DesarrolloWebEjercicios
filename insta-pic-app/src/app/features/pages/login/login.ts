import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  LogInForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(2)]],
  });

  onLogin() {
    const { username: inputUsername, password: inputPassword } = this.LogInForm.value;

    if (!this.LogInForm.valid) {
      alert('Faltan campos por diligenciar mi papacho');
      return;
    }
    const credentialsString = localStorage.getItem(inputUsername!);
    if (!credentialsString) {
      alert('Usuario no encontrado');
      return;
    }
    if (credentialsString) {
      const credentials = JSON.parse(credentialsString);

      const isValidPassword = inputPassword === credentials.password;
      if (isValidPassword) {
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/home']);
      } else {
        alert('Las credenciales son incorrectas mi papá');
      }
    }
  }
}
