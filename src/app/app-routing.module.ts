import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatContentComponent } from './views/chat-content/chat-content.component';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginSignupComponent } from './views/login/login-signup/login-signup.component';
import { NewChatComponent } from './views/new-chat/new-chat.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent ,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'login',
    component: LoginSignupComponent 
  },
  { 
    path: 'chat',
    component: ChatContentComponent ,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'chat/:id',
    component: ChatContentComponent ,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'new-chat',
    component: NewChatComponent ,
    canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuard],
})
export class AppRoutingModule { }
