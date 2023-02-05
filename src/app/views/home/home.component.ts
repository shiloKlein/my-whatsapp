import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Chat } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private chatService: ChatService,
    // private userMsgService: UserMsgService
  ) { }

  chats!: Chat[]// = ChatService.chats
  chats$!: Observable<Chat[]>
  subscription!: Subscription

  ngOnInit() {
    this.chatService.query()
    this.chats$ = this.chatService.chats$
    window.scrollTo({ top: document.body.scrollHeight})
  }
}
 