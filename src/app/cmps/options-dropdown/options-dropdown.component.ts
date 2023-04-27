import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'options-dropdown',
  templateUrl: './options-dropdown.component.html',
  styleUrls: ['./options-dropdown.component.scss']
})
export class OptionsDropdownComponent implements OnInit{
@Output()loggedOut=  new EventEmitter<string>()
@Input()headerType!:string
isChatList!:Boolean

ngOnInit(): void {
  if(this.headerType ==='chat-list')this.isChatList = true
}
logout(){
this.loggedOut.emit()
}
}
