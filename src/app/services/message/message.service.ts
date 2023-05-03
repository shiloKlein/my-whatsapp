import { Injectable } from '@angular/core';
import { Chat, Message, MessageType, NewMessage } from 'src/app/models/chat.model';
import { ChatService } from '../chat.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:3030/api/message'

  constructor(private chatService:ChatService, private http: HttpClient) { }

  async sendMsg(newMessage: NewMessage, chatId: string): Promise<Message> {
    const chat: Chat[] = [...this.chatService.chatsDB.filter(chat => chat.id === chatId)]
    console.log('chat', chat)
    const result = await this.http.post<Message>(`${this.baseUrl}`, newMessage, { withCredentials: true }).toPromise();
    // chat[0].messages.push(message)
    // console.log('logged', this.loggedInUser.id === message.from)
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    // demo
    setTimeout(() => {
      this.recieveMsg()
    }, 2000);
    // end of demo
    if(result) return result
    else throw new Error('no messeage sent')
  }
  recieveMsg() {
    // demo
    const chatId = '102'
    const newMessage = this.getEmptyMsg()
    // newMessage.from = 2
    newMessage.type = MessageType.Text
    // const chat: Chat[] = [...this._chatsDB.filter(chat => chat.id === chatId)]
    newMessage.content = _getRandomChatMessage()

    // chat[0].messages.push(newMessage)
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    // TODO: ADD CONDITION. ONLY IF USER VP IS NEAR THE BOTTOM - SCROLL. OTHERWISE ADD A SIGN THAT THERE IS NEW UNREAD MESSAGE

    return newMessage
  }
  getEmptyMsg() {
    return {
      // id: _getRandomIntInclusive(1000000, 9999999),
      // from: 0,
      type: MessageType.Text,
      content: '',
      // isRead: false,
      // createdAt: new Date(),

    }
  }
}

function _getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}


function _getRandomChatMessage() {
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

