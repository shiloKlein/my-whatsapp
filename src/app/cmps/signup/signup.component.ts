import { Component, EventEmitter, Output } from '@angular/core';
import { UserAuth } from 'src/app/models/chat.model';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @Output() signedUp = new EventEmitter<UserAuth>()

  phoneNumber: string = ''
  password: string = ''
  fullName:string=''
  signup() {
    if (!this.phoneNumber || !this.password) return
    const userData = {
      phoneNumber: this.phoneNumber,
      password: this.password,
      fullName:this.fullName
    };
    this.signedUp.emit(userData)
    // add form handling with restrictions

  }
}

