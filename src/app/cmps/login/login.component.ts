import { Component, EventEmitter, Output } from '@angular/core';
import { UserAuth } from 'src/app/models/chat.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
// @Input() imgUrl!: string
export class LoginComponent {
  @Output() loggedIn = new EventEmitter<UserAuth>()

  phoneNumber: string = ''
  password: string = ''
  login() {
    if (!this.phoneNumber || !this.password) return
    const userData = {
      phoneNumber: this.phoneNumber,
      password: this.password
    };
    this.loggedIn.emit(userData)
    // add form handling with restrictions

  }
}

