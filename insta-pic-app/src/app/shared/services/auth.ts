import { Injectable } from '@angular/core';
import { LoginResponse, SignUpResponse } from '../interfaces/login-response';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  login(user: User): LoginResponse {
    let userSrt = localStorage.getItem(user.username);

    if (userSrt && user.password === JSON.parse(userSrt)['password']) {
      return { success: true, redirectTo: 'home' };
    }

    return { success: false };
  }

  signUp(user: User): SignUpResponse {
    if (localStorage.getItem(user.username)) {
      return { success: false, message: 'Usuario ya existe' };
    }

    localStorage.setItem(user.username, JSON.stringify(user));
    return { success: true, redirectTo: 'home' };
  }

  private getUser(username: string) {}
}
