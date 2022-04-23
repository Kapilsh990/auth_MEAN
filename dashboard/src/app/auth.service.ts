import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from './user';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  API_URL: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient,public router: Router){}

  register(user: User): Observable<any> {

    return this.httpClient.post(`${this.API_URL}/api/register`, user).pipe(
        catchError(this.handleError)
    )
  }

  login(user: User) {
    return this.httpClient.post<any>(`${this.API_URL}/api/login`, user)
      .subscribe((res: any) => {
        console.log(res)
        if(res.status){
          localStorage.setItem('access_token', res.token)
        this.router.navigate(['/profile']);
        }
        
        // this.getUserProfile(res._id).subscribe((res) => {
          // this.currentUser = res;
          
        // })
      })
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    if (localStorage.removeItem('access_token') == null) {
      this.router.navigate(['login']);
    }
  }

  // getUserProfile(id): Observable<any> {
    
  // }

  getUserData(){
    this.httpClient.get<any>(`${this.API_URL}/api/profile-data`,)
      .subscribe((res: any) => {
        console.log(res)
      })
  }
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
