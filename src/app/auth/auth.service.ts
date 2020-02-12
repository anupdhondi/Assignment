import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from "@angular/common/http";


import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private http: HttpClient, private router: Router) {}

  login(authData: AuthData) {

    this.user = {
      email: authData.email
    };

    this.http
      .post(
        "http://localhost:3000/backend/login",
        authData
      )
      .subscribe(response => {
        console.log('from response' + JSON.stringify(response));
          if(response){
            this.authChange.next(true);
            this.router.navigate(["/orders"]);
          }
          else {
              console.log('could not login user');
          }
        }
      );
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

}
