import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatContentComponent } from './views/chat-content/chat-content.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent 
  },
  { 
    path: 'chat/:id',
    component: ChatContentComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
