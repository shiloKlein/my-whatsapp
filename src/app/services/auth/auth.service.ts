import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { User, UserAuth } from 'src/app/models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3030/api/auth'; // replace with your server URL
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$: Observable<User > = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { 
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserSubject.next(loggedInUser);
  }

  isLoggedIn(): boolean {
    // check if the user is logged in
    return !!localStorage.getItem('currentUser')
  }

async login(credensials: UserAuth) {
    try {
        const result = await this.http.post<UserAuth>(`${this.baseUrl}/login`, credensials,{ withCredentials: true } ).toPromise();
        
        if (result !== undefined) {
          localStorage.setItem('currentUser', JSON.stringify(result));
          this.currentUserSubject.next(result);
        }
    } catch (err) {
        console.error('Failed to Login ', err);
        // Handle the error here
    }
}

async signup(newUser: UserAuth) {
  console.log('newUser', newUser);
  try {
    const result = await this.http.post<UserAuth>(`${this.baseUrl}/signup`, newUser,{ withCredentials: true }).toPromise();
    console.log('result', result);
    
  } catch (err) {
    console.log(err)
    // TODO: return the error and display it to the user. eventbus?
  }
}

  async logout() {
    try {
      await this.http.post<UserAuth>(`${this.baseUrl}/logout`,{}).toPromise();
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      console.log('logout');
      
    } catch (err) {
      console.log(err);
    }
  }
  getToken(): string|null {

  const loginToken =   document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  if(loginToken)   return loginToken
  console.log('there is no token');
  return null
  
  }

}