import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Chat, User } from 'src/app/models/chat.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrls: ['./chat-preview.component.scss']
})
export class ChatPreviewComponent {
  @Input() chat!: Chat
  @Input() contact!: User
  @Input() isNewChat!: Boolean

  constructor(private userService: UserService, private router: Router) { }
  avatarImage = this.userService.avatarImage

  openChat() {
    if (this.chat){
      this.router.navigate([`/chat/${this.chat.id}`])
    }else{
      this.userService.setSelectedUsers([this.contact])
      const navigationExtras = {
        queryParams: {
          isNewChat: true,
          isGroup:false
        }
      };
      this.router.navigate(['/chat'], navigationExtras);
    }
  }

  onLongPress(ev: any) {
    console.log('ev', ev)
    // ev.preventDefault()
    console.log('chat pressed longg')
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
