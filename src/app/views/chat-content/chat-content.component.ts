import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Chat, Message, UserDetails } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent implements OnInit, OnDestroy {
  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private utilService:UtilService,
    private route: ActivatedRoute,
    // private snapShot: ActivatedRouteSnapshot,
    private router: Router,

    // private userMsgService: UserMsgService
  ) { }
  userId: string = '0101'
  chat!: Chat
  loggedInUser!: UserDetails
  subscription!: Subscription

  ngOnInit(): void {
    this.loadChat()
    this.loadUser()
  }

  ngOnDestroy(): void {

  }
  loadChat() {
    console.log('this.route.data', this.route.data)
    const chatId = this.route.snapshot.paramMap.get('id')
    console.log('id', chatId)
    if (!chatId) return
    this.chatService.getChatById(chatId)
      .subscribe(chat => {
        console.log('chat', chat)
        this.chat = chat
      })
  }
  loadUser() {
    this.userService.getLoggedInUser()
      .subscribe(user => this.loggedInUser = user)
  }
  checkOwner(id: string): boolean {
    return this.loggedInUser._id === id
  }

  sendMsg(msg: string) {
    console.log('this.chat.messages',this.chat)
    const message:Message = this.chatService.getEmptyMsg()
    const user = {...this.loggedInUser}
    message.from = user
    message.content = msg
    message.isText=true
  
    this.chatService.sendMsg(message,this.chat._id)

  }
  sendRecording(recordingDataUrl: string) {
    const message:Message = this.chatService.getEmptyMsg()
    const user = {...this.loggedInUser}
    message.from = user
    message.content = recordingDataUrl
    message.isRecording=true
    this.chatService.sendMsg(message,this.chat._id)
    // console.log('recording(for now the message)', recordingDataUrl)
  }

  sendImg(imgDataUlr:string){
    const message:Message = this.chatService.getEmptyMsg()
    const user = {...this.loggedInUser}
    message.from = user
    message.content = imgDataUlr
    message.isImg=true
    this.chatService.sendMsg(message,this.chat._id)

  }

}

// class Msg(from:UserDetails, content:string){
//   constructor(){
//     this._id = getRandomIntInclusive(1000000, 9999999)
//     this.from = from
//     content = content
//     isRead = false
//     this.createdAt: Date = new Date()
//   }

// }


