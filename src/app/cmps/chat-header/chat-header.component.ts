import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/chat.model';

@Component({
  selector: 'chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent implements OnInit{
  @Input() imgUrl!: string
  @Input() participants!: User[]|null
  @Input() groupName!: string|undefined
  @Input() isGroup!: Boolean
  
  isSearch!: Boolean

  ngOnInit() {
    this.isSearch = false;
    
  }
  
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
