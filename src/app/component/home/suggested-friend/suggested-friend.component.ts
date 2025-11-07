import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FetchApiService} from '../../../commom/service/api/fetch-api.service';
import {DialogService} from '../../../commom/dialog.service';

@Component({
  selector: 'app-suggested-friend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggested-friend.component.html',
  styleUrls: ['./suggested-friend.component.css']
})
export class SuggestedFriendComponent {
  @Input() suggestedFriends: any[] = [];

  @Output() requestSent = new EventEmitter<number>();

  constructor(private dialog: DialogService,
              private apiService: FetchApiService) {
  }

  onAddFriend(friend: any) {
    friend.isLoading = true;
    this.apiService.sendFriendRequest(friend.id).subscribe({
      next: () => {
        this.dialog.success(`Đã gửi lời mời đến: ${friend.username}`);
        this.requestSent.emit(friend.id);
      },
      error: (err) => {
        const errorMessage = err.error && err.error.errorDesc
          ? err.error.errorDesc
          : 'Có lỗi xảy ra, vui lòng thử lại.';

        this.dialog.error(errorMessage);

        friend.isLoading = false;
      }
    })
  }
}
