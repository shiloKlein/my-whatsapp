import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuth } from 'src/app/models/chat.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent {

  constructor(
    private authService: AuthService,private router: Router
    ){}

  isLogin = true

  toggleLoginSignup() {
    this.isLogin = !this.isLogin
  }
  async login(credensials: UserAuth) {
    // const user = this.authService.login(credensials)
    await this.authService.login(credensials)
    // await this.authService.logout()
    this.router.navigate(['/']);
  }
  
  signUp = (newUser: UserAuth) => {
    const user = this.authService.signup(newUser)
  }
}
