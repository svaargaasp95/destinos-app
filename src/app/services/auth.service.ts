import { Injectable } from '@angular/core';

export abstract class BaseAuthService {
  abstract isLoggedIn(): boolean;
  abstract login(user: string, pass: string): boolean;
  abstract logout(): void;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseAuthService {
  private loggedIn = false;

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(user: string, pass: string): boolean {
    if (user === 'admin' && pass === '1234') {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
  }
}
