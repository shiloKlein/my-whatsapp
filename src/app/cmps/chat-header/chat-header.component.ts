import { Component, Input } from '@angular/core';
import { UserDetails } from 'src/app/models/chat.model';

@Component({
  selector: 'chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent {
  @Input() imgUrl!: string
  @Input() participants!: UserDetails[]
  @Input() groupName!: string
  @Input() isGroup!: boolean
  
  isSearch: boolean = false

  
  openMenu(): void {
  }

  openSearch(): void {
    this.isSearch=true
    console.log('this.isSearch',this.isSearch)
  }
  closeSearch(){
    this.isSearch=false
  }  
  
  search(){
  
  }
}
