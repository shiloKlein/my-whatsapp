import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/chat.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private baseUrl = 'http://localhost:3030/api/user'; // replace with your server URL
  private UsersSubject = new BehaviorSubject<any>(null);
  public Users$: Observable<User[] | null> = this.UsersSubject.asObservable();
  private SelectedUsersSubject = new BehaviorSubject<any>(null)
  public SelectedUsers$:Observable<User[]|null> = this.SelectedUsersSubject.asObservable()
  public avatarImage: string = 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png'


  constructor(private http: HttpClient, private authService: AuthService) { }

  loggedInUser: User = {
    id: 1,
    fullName: 'Yehuda Levavi',
    profileImage: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
    about: '{Gute == Gute()}',
    phoneNumber: '0538927854',
    signupDate: new Date(Date.now() - 9947738)
  }

  contacts!: any[]
  searchedUsers!: any[]


  getLoggedInUser() {
    return of(this.loggedInUser)
  }

  loadUserContacts(contacts: any) {
    this.contacts = contacts
  }

  async query(txt: string) {
    if (!txt) return []
    try {
      const criteria = { txt };
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.getToken()}`,
        }),
        params: criteria,
        withCredentials: true
      };
      const searchedUsers = await this.http.get<User[]>(`${this.baseUrl}`, options,).toPromise();
      console.log('result', searchedUsers)
      return searchedUsers
    } catch (err) {
      console.log(err);
      return null
    }
  }
  public setSelectedUsers(selectedUsers: User[]) {
    this.SelectedUsersSubject.next(selectedUsers);
  }

}
