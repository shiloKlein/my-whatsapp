import { Component, Input } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';

@Component({
  selector: 'chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrls: ['./chat-preview.component.scss']
})
export class ChatPreviewComponent {
  @Input() chat!: Chat

  onLongPress(ev:any){
    console.log('ev',ev)
    // ev.preventDefault()
  console.log('chat pressed long')
  }

  get lastMsgTime() {
    const time = this.chat.messages[0].createdAt
    if (time.getDay() === new Date().getDay()) {
      return time.toLocaleTimeString('il-IL', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    }
    if (time.getDay() - time.getDay() <= 1) {
      return 'Yesterday'
    }
    return time.toLocaleTimeString('il-IL', {
      day: "numeric", month: "long"
    });
  }
}
