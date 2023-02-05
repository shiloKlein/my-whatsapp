import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { UserDetails } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  loggedInUser: UserDetails = {
    _id: '0101',
    name: 'Yehuda',
    imgUrl: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
    about: '{Gute == Gute()}',
    phoneNumber: '0538927854'
  }

  contacts!: any[]



  getLoggedInUser() {
    return of(this.loggedInUser)
  }

  loadUserContacts(contacts:any){
  this.contacts = contacts
  }

}
