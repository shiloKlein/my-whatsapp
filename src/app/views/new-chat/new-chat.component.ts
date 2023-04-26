import { Component, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util/util.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/chat.model';

@Component({
  selector: 'new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.scss']
})
export class NewChatComponent implements OnDestroy {
  debounceSubscription: Subscription = new Subscription();

  contacts!: User[] | null | undefined
  // contacts!: any

  constructor(private utilService: UtilService, private userService: UserService) { }

  searchUsers(searchTerm: string) {
    this.debounceSubscription.unsubscribe();
    this.debounceSubscription = this.utilService.debounce(300).subscribe(async () => {
      this.contacts = await this.userService.query(searchTerm);
    });
    this.utilService.triggerDebounce(searchTerm);
  }

  ngOnDestroy() {
    this.debounceSubscription.unsubscribe();
  }
}
