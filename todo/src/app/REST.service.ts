import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const ROOT = environment.API_URL;
const LOGIN_LINK = `${ROOT}users/login`;
const SIGNUP_LINK = `${ROOT}/users/sign-up`;
const USER_LINK = `${ROOT}users/me`;
const TODOS_LINK = `${ROOT}users/todos`;

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
  }

  /* AUTHENTICATION */
  login(email) {
    console.log('[LOGIN QUERY]');

    return this.http.post(LOGIN_LINK, { email }).pipe(map((res) => { console.log(res); return res; }));
  }
  register(email) {
    console.log(email);

    return this.http.post(SIGNUP_LINK, { email });
  }
  getUser() {

    console.log('[GETUSER QUERY]');

    return this.http.get(USER_LINK).toPromise();
  }

  // TODOS
  getTODOList(filter) {
    console.log('[GET TODOS QUERY]');

    return this.http.get(TODOS_LINK, { params: { filter: JSON.stringify(filter) } }).pipe(map((v: any) => {

      return v;
    }));

  }

  createTODO(values: any) {
    console.log('[CREATE TODOS QUERY]');

    return this.http.post(TODOS_LINK, values).toPromise();
  }

  updateTODO(data) {
    console.log('[UPDATE TODO QUERY]');

    const where: any = { id: data.id };

    return this.http.patch(TODOS_LINK, data, { params: { filter: JSON.stringify({ where }) } }).toPromise();
  }

  async deleteTODO(id: any) {
    console.log('[DELETE TODO QUERY]');

    const where: any = { id };

    return this.http.delete(TODOS_LINK, { params: { filter: JSON.stringify({ where }) } }).toPromise();
  }
}

