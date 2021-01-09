import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { tap, mapTo, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RestService } from '../REST.service';

@Injectable({
  providedIn: 'root'
})
export class AuthManagerService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  connection$: any;
  RETRY_SECONDS: 10;

  constructor(private http: RestService, private router: Router) { }

  login(email: string) {
    return this.http.login(email).pipe(
      tap(result => this.doLoginUser(email, result)),
      mapTo({ success: true, message: '' }),
      catchError(error => {
        console.log(error.error);

        return of({ success: false, message: 'Mail incorrect' });
      }));
  }

  async logout() {
    this.router.navigate(['/login']);
    this.doLogoutUser();
    return true;

  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(email: string, result: any) {
    this.loggedUser = email;
    this.storeTokens(result.token);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private storeTokens(jwt) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
