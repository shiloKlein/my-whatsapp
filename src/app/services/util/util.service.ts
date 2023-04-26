import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private debounceSubject = new Subject();
  constructor() { }

  debounce(time: number): Observable<any> {
    return this.debounceSubject.asObservable().pipe(debounceTime(time));
  }

  triggerDebounce(data:any) {
    this.debounceSubject.next(data);
  }

chatDemoData = [
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

getRandomChatMessage():string {
  const randomIndex = Math.floor(Math.random() * this.chatDemoData.length);
  return this.chatDemoData[randomIndex];
}
// console.log(this.getRandomChatMessage())
}
