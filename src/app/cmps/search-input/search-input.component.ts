import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/chat.model';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util/util.service';


@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
@Output()search = new EventEmitter<string>()

constructor(
  private utilService:UtilService,
  private userService:UserService
  
  ){}
 

  searchTerm: string = ''
  searchChats() {
    const searchTerm = this.searchTerm;
    this.search.emit(searchTerm)
  }
}
