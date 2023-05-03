import { Injectable } from '@angular/core';
import { Chat, Message, MessageType, NewMessage, User } from '../models/chat.model'

import { BehaviorSubject, Observable, of } from 'rxjs'
import { UtilService } from './util/util.service';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
// import { UtilService} from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:3030/api/chat'


  constructor(private http: HttpClient, private utilService: UtilService,
    private userService: UserService) { }
  // utilService = this.UtilService
  loggedInUser: User = {
    id: 1,
    fullName: 'Yehuda Levavi',
    profileImage: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
    about: '{Gute == Gute()}',
    phoneNumber: '0538927854',
    signupDate: new Date(Date.now() - 9947738)
  }

  public chatsDB: Chat[] = [
    {
      id: '101',
      name: 'Yehuda',
      chatImage: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',//has to be changed to rectengle img
      participants: [
        {
          id: 1,
          fullName: 'Yehuda Levavi',
          profileImage: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
          about: '{Gute == Gute()}',
          phoneNumber: '0538927854'
        },
        {
          id: 2,
          fullName: 'Isic Ben-abi',
          profileImage: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
          about: '{and == friends()}',
          phoneNumber: '0538927854'
        }
      ],
      messages: [
        {
          id: 1101,
          from: 1,
          type: MessageType.Text,
          content: `i can tell only for myself but it was a good day bro`,
          // isRead: false,
          createdAt: new Date(1674503547763)
        }
      ],
      unReadCount: 0,
      isGroupChat: false,
      isMute: false,
      createdAt: new Date(1674503547763),
      updatedAt:new Date(1674503549999),
      createdBy:3
    },
    {
      id: '102',
      name: 'Isic',
      chatImage: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',//has to be changed to rectengle img
      participants: [
        {
          id: 1,
          fullName: 'Yehuda Levavi',
          profileImage: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
          about: '{Gute == Gute()}',
          phoneNumber: '0538927854'
        },
        {
          id: 2,
          fullName: 'Isic Ben-abi',
          profileImage: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
          about: '{and == friends()}',
          phoneNumber: '0538927854'
        }
      ],
      messages: [
        {
          id: 1101,
          from: 2,
          type: MessageType.Text,
          content: `i can tell only for myself but it was a good day bro. i dont care why i just want to get to the elipsis thing in css to check if what i did works.`,
          // isRead: false,
          createdAt: new Date(1674503547763)
        },
        {
          id: 1102,
          from: 1,
          type: MessageType.Text,
          content: `i can tell only for myself but it was a good day bro. i dont care why i just want to get to the elipsis thing in css to check if what i did works.`,
          // isRead: false,
          createdAt: new Date(1674503547763)
        },
        {
          id: 1102,
          from: 1,
          type: MessageType.Text,
          content: `i can tell only for myself but it was a good day bro. i dont care why i just want to get to the elipsis thing in css to check if what i did works.`,
          // isRead: false,
          createdAt: new Date(1674503547763)
        },
        {
          id: 1102,
          from: 1,
          type: MessageType.Text,
          content: `i can tell only for myself but it was a good day bro. i dont care why i just want to get to the elipsis thing in css to check if what i did works.`,
          // isRead: false,
          createdAt: new Date(1674503547763)
        },
      ],
      unReadCount: 0,
      isGroupChat: false,
      isMute: false,
      createdAt: new Date(1674503547763),
      updatedAt:new Date(1674503549999),
      createdBy:3
    }

  ]
  private _chats$ = new BehaviorSubject<Chat[]>([])
  public chats$ = this._chats$.asObservable()

  query() {
    this._chats$.next(this.chatsDB)

  }
  getChatById(chatId: string): Observable<Chat> {//Observable<Chat>
    const chat = this.chatsDB.filter(chat => chat.id === chatId)
    return of(...chat)
    // return ''
  }
  getLoggedInUser() {
    return of(this.loggedInUser)
  }
  async createChat() {
    try {
      let users
      this.userService.SelectedUsers$.subscribe(selectedUsers => {
        users = selectedUsers
      });
      const chatToAdd = { isGroupChat: false, participants: users, name: '' };
      const result = await this.http.post<Chat>(`${this.baseUrl}`, chatToAdd, { withCredentials: true }).toPromise();
      return result
    } catch (err) {
      console.log(err);
      throw err
    }
  }

}

