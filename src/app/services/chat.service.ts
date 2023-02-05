import { Injectable } from '@angular/core';
import { Chat, Message, User, UserDetails } from '../models/chat.model'

import { BehaviorSubject, Observable, of } from 'rxjs'
import { UtilService } from './util.service';
// import { UtilService} from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private UtilService!: UtilService

  constructor() { }
  utilService = this.UtilService
  loggedInUser:UserDetails = {
    _id: '0101',
    name: 'Yehuda',
    imgUrl: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
    about: '{Gute == Gute()}',
    phoneNumber: '0538927854'
  }

  private _chatsDB: Chat[] = [
    {
      _id: '101',
      name: 'Yehuda',
      imgUrl: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',//has to be changed to rectengle img
      participants: [
        {
          _id: '0101',
          name: 'Yehuda',
          imgUrl: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
          about: '{Gute == Gute()}',
          phoneNumber: '0538927854'
        },
        {
          _id: '0102',
          name: 'isic',
          imgUrl: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
          about: '{and == friends()}',
          phoneNumber: '0538927854'
        }
      ],
      messages: [
        {
          _id: '1101',
          from: {
            _id: '0101',
            name: 'Yehuda',
            imgUrl: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
            about: '{Gute == Gute()}',
            phoneNumber: '0538927854'
          },
          isText:true,
          isRecording:false,
          isVideo:false, 
isImg:false,
          content: `i can tell only for myself but it was a good day bro`,
          isRead: false,
          createdAt: new Date(1674503547763)
        }
      ],
      unReadCount: 0,
      isGroup: false,
      isMute: false,
      createdAt: new Date(1674503547763)
    },
    {
      _id: '102',
      name: 'Isic',
      imgUrl: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',//has to be changed to rectengle img
      participants: [
        {
          _id: '0101',
          name: 'Yehuda',
          imgUrl: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
          about: '{Gute == Gute()}',
          phoneNumber: '0538927854'
        },
        {
          _id: '0102',
          name: 'isic',
          imgUrl: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
          about: '{and == friends()}',
          phoneNumber: '0538927854'
        }
      ],
      messages: [
        {
          _id: '1101',
          from: {
            _id: '0102',
            name: 'isic',
            imgUrl: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
            about: '{and == friends()}',
            phoneNumber: '0538927854'
          },
          isText:true,
          isRecording:false,
          isVideo:false, 
isImg:false,
          content: `i can tell only for myself but it was a good day bro. i dont care why i just want to get to the elipsis thing in css to check if what i did works.`,
          isRead: false,
          createdAt: new Date(1674503547763)
        },
        {
          _id: '1102',
          from:  {
            _id: '0101',
            name: 'Yehuda',
            imgUrl: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
            about: '{Gute == Gute()}',
            phoneNumber: '0538927854'
          },
          isText:true,
          isRecording:false,
          isVideo:false, 
isImg:false,
          content: `i can tell only for myself but it was a good day bro. i dont care why i just want to get to the elipsis thing in css to check if what i did works.`,
          isRead: false,
          createdAt: new Date(1674503547763)
        },
        {
          _id: '1102',
          from:  {
            _id: '0101',
            name: 'Yehuda',
            imgUrl: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
            about: '{Gute == Gute()}',
            phoneNumber: '0538927854'
          },
          isText:true,
          isRecording:false,
          isVideo:false, 
isImg:false,
          content: `i can tell only for myself but it was a good day bro. i dont care why i just want to get to the elipsis thing in css to check if what i did works.`,
          isRead: false,
          createdAt: new Date(1674503547763)
        },
        {
          _id: '1102',
          from:  {
            _id: '0101',
            name: 'Yehuda',
            imgUrl: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
            about: '{Gute == Gute()}',
            phoneNumber: '0538927854'
          },
          isText:true,
          isRecording:false,
          isVideo:false, 
isImg:false,
          content: `i can tell only for myself but it was a good day bro. i dont care why i just want to get to the elipsis thing in css to check if what i did works.`,
          isRead: false,
          createdAt: new Date(1674503547763)
        },
      ],
      unReadCount: 0,
      isGroup: false,
      isMute: false,
      createdAt: new Date(1674503547763)
    }

  ]
  private _chats$ = new BehaviorSubject<Chat[]>([])
  public chats$ = this._chats$.asObservable()

  query() {
    this._chats$.next(this._chatsDB)

  }
  getChatById(chatId: string): Observable<Chat>{//Observable<Chat>
    const chat = this._chatsDB.filter(chat => chat._id === chatId)
    return of(...chat)
    // return ''
  }
  getLoggedInUser(){
  return of(this.loggedInUser)
  }
  sendMsg(message:Message, chatId:string):Message{
    const chat:Chat[] = [...this._chatsDB.filter(chat => chat._id === chatId)]
    console.log('chat',chat)
    chat[0].messages.push(message)
    console.log('logged',this.loggedInUser._id===message.from._id)
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    // demo
    setTimeout(() => {
      this.recieveMsg()
    }, 2000);
    // end of demo
    return message
  }
  recieveMsg(){
  // demo
  const chatId = '102'
  const newMessage = this.getEmptyMsg()
  newMessage.from = {
    _id: '0102',
    name: 'isic',
    imgUrl: 'https://res.cloudinary.com/dtcqwwf0m/image/upload/v1674483580/whatsapp/avatar-person_fpflei.png',
    about: '{and == friends()}',
    phoneNumber: '0538927854'
  }
  newMessage.isText = true
  const chat:Chat[] = [...this._chatsDB.filter(chat => chat._id === chatId)]
  newMessage.content = _getRandomChatMessage()

  chat[0].messages.push(newMessage)
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
// TODO: ADD CONDITION. ONLY IF USER VP IS NEAR THE BOTTOM - SCROLL. OTHERWISE ADD A SIGN THAT THERE IS NEW UNREAD MESSAGE
 
  return newMessage
  }
  getEmptyMsg(){
  return {
    _id: _getRandomIntInclusive(1000000, 9999999),
    from: {
      _id: '',
      name: '',
      imgUrl:'',
      about:'',
      phoneNumber:'',
    },
    isText:false,
    isRecording:false,
    isVideo:false, 
isImg:false,
    content:'',
    isRead:false,
    createdAt: new Date(),

}
  }
}

function _getRandomIntInclusive(min: number, max: number): string {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min) + ''; // The maximum is inclusive and the minimum is inclusive
}


function _getRandomChatMessage(){
  const randomIndex = Math.floor(Math.random() * chatDemoData.length);
  return chatDemoData[randomIndex];
}
const chatDemoData = [
  "Hey, how are you doing? Everything's good on my end.",
  "What's up? Not much, just hanging out. How about you?",
  "Not much, just enjoying the day. What's new with you?",
  "I'm good, thanks for asking. How have you been?",
  "I'm doing well, thanks. How about you?",
  "I'm great, thanks for asking. How has your day been?",
  "I'm good, just enjoying some free time. How are things with you?",
  "Everything's good, thanks. How are you?",
  "I'm good, just enjoying some relaxation time. What have you been up to?",
  "I'm good, thanks for asking. How about you?",
  "I'm doing well, thanks. How have you been?",
  "Not much, just hanging out. How's everything with you?",
  "I'm good, thanks for asking. How have you been?",
  "I'm doing well, thanks. How about you?",
  "I'm great, thanks for asking. How has your day been?",
  "I'm good, just enjoying some free time. How are things with you?",
  "Everything's good, thanks. How are you?",
  "I'm good, just enjoying some relaxation time. What have you been up to?",
];
