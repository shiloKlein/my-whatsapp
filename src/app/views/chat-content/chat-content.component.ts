import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Chat, Message, MessageType, User } from 'src/app/models/chat.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent implements OnInit, OnDestroy {
  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private authService: AuthService,
    private utilService: UtilService,
    private route: ActivatedRoute,
    // private snapShot: ActivatedRouteSnapshot,
    private router: Router,

    // private userMsgService: UserMsgService
  ) { }
  userId: string = '0101'
  chat!: Chat
  newChatUser!: User
  newChatIsGroup!: Boolean
  loggedInUser!: User
  subscription!: Subscription
  MessageType = MessageType
  avatarImage = this.userService.avatarImage

  ngOnInit(): void {
    this.loadChat()
    this.loadUser()

  }

  ngOnDestroy(): void {

  }
  loadChat() {
    console.log('this.route.data', this.route.data)
    const chatId = this.route.snapshot.paramMap.get('id')
    if (chatId) {
      console.log('id', chatId)
      this.chatService.getChatById(chatId)
        .subscribe(chat => {
          console.log('chat', chat)
          this.chat = chat
        })
    } else {
      this.route.queryParams.subscribe(params => {
        this.newChatIsGroup = params['isGroup'] ? JSON.parse(params['isGroup']) : null;
      });
      // const userId = params['userId'] ? params['userId'] : null;
      this.userService.SelectedUsers$.subscribe(users => {
        if (users && users.length > 0) {
          this.newChatUser = users[0]
        }
      })
      console.log(this.newChatUser);
      // Use the user details as needed
    }
  }
  loadUser() {
    this.authService.currentUser$.subscribe(user => {
      this.loggedInUser = user;
    });
  }
  checkOwner(id: number): boolean {
    return this.loggedInUser?.id === id
  }

  sendMsg(msg: string) {
    console.log('this.chat.messages', this.chat)
    const message: Message = this.chatService.getEmptyMsg()
    const user = { ...this.loggedInUser }
    message.from = user.id
    message.content = msg
    message.type = MessageType.Text

    this.chatService.sendMsg(message, this.chat.id)

  }
  sendRecording(recordingDataUrl: string) {
    const message: Message = this.chatService.getEmptyMsg()
    const user = { ...this.loggedInUser }
    message.from = user.id
    message.content = recordingDataUrl
    message.type = MessageType.Recording
    this.chatService.sendMsg(message, this.chat.id)
    // console.log('recording(for now the message)', recordingDataUrl)
  }

  sendImg(imgDataUrl: string) {
    const message: Message = this.chatService.getEmptyMsg()
    const user = { ...this.loggedInUser }
    message.from = user.id
    message.content = imgDataUrl
    message.type = MessageType.Image
    this.chatService.sendMsg(message, this.chat.id)
    console.log('imgDataUrl', imgDataUrl)

  }

}

// class Msg(from:User, content:string){
//   constructor(){
//     this.id = getRandomIntInclusive(1000000, 9999999)
//     this.from = from
//     content = content
//     isRead = false
//     this.createdAt: Date = new Date()
//   }

// }


