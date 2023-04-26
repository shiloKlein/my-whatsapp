import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'chat-list-header',
  templateUrl: './chat-list-header.component.html',
  styleUrls: ['./chat-list-header.component.scss']
})
export class ChatListHeaderComponent {
  @Input() isChatList!: Boolean

  constructor(private router: Router,private authService: AuthService) { }

  optionsOpen = false

  addChat() {
    this.router.navigate(['/new-chat']);
  }
  back() {
    this.router.navigate(['/'])
  }
  openOptions() {
    if(this.optionsOpen)return
    setTimeout(() => {
      this.optionsOpen = !this.optionsOpen
    }, 0);
  }
  closeOptions(){
      this.optionsOpen = false
  }
  logout(){
  this.authService.logout()
  this.router.navigate(['/login'])
  }
}
