import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule}from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HomeComponent } from './views/home/home.component';
import { ChatHeaderComponent } from './cmps/chat-header/chat-header.component';
import { SearchInputComponent } from './cmps/search-input/search-input.component';
import { ChatFilterComponent } from './cmps/chat-filter/chat-filter.component';
import { ChatListComponent } from './cmps/chat-list/chat-list.component';
import { ChatListHeaderComponent } from './cmps/chat-list-header/chat-list-header.component';
import { ChatPreviewComponent } from './cmps/chat-preview/chat-preview.component';
import { ChatContentComponent } from './views/chat-content/chat-content.component';
import { SendBarComponent } from './cmps/send-bar/send-bar.component';
import { CameraComponent } from './cmps/camera/camera.component';
import { LongPressDirective } from './directives/long-press.directive';
import { LoginSignupComponent } from './views/login/login-signup/login-signup.component';
import { LoginComponent } from './cmps/login/login.component';
import { SignupComponent } from './cmps/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { NewChatComponent } from './views/new-chat/new-chat.component';
import { NgContentEditableModelDirective } from './directives/ng-content-editable-model.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatHeaderComponent,
    SearchInputComponent,
    ChatFilterComponent,
    ChatListComponent,
    ChatListHeaderComponent,
    ChatPreviewComponent,
    ChatContentComponent,
    SendBarComponent,
    CameraComponent,
    LongPressDirective,
    LoginSignupComponent,
    LoginComponent,
    SignupComponent,
    NewChatComponent,
    NgContentEditableModelDirective,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
