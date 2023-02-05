import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { ChatService } from '../../services/chat.service'
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, OnDestroy {
  @Input() chats!: Chat[] | null
  constructor(
    private chatService: ChatService,
  ) { }
  subscription!: Subscription

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

}
