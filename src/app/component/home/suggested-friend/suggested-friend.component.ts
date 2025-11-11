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
              private apiService: FetchApiService) { }

  onAddFriend(friend: any) {
    friend.isLoading = true;
    this.apiService.sendFriendRequest(friend.id).subscribe({
      next: () => {
        this.dialog.success(`Đã gửi lời mời đến: ${friend.username}`);
        this.requestSent.emit(friend.id);
        friend.type = 'SENT'; // cập nhật thành SENT
        friend.isLoading = false;
      },
      error: (err) => {
        const errorMessage = err.error?.errorDesc || 'Có lỗi xảy ra, vui lòng thử lại.';
        this.dialog.error(errorMessage);
        friend.isLoading = false;
      }
    });
  }

  cancelRequest(friend: any) {
    this.apiService.sendFriendRequest(friend.user.id).subscribe({
      next: () => {
        this.dialog.success(`Đã huỷ lời mời đến: ${friend.user.username}`);
        this.suggestedFriends = this.suggestedFriends.filter(f => f !== friend);
      },
      error: err => this.dialog.error('Huỷ lời mời thất bại')
    });
  }

  acceptRequest(friend: any) {
    this.apiService.sendFriendRequest(friend.user.id).subscribe({
      next: () => {
        this.dialog.success(`Đã chấp nhận lời mời từ: ${friend.user.username}`);
        this.suggestedFriends = this.suggestedFriends.filter(f => f !== friend);
      },
      error: err => this.dialog.error('Chấp nhận lời mời thất bại')
    });
  }

  rejectRequest(friend: any) {
    this.apiService.sendFriendRequest(friend.user.id).subscribe({
      next: () => {
        this.dialog.success(`Đã từ chối lời mời từ: ${friend.user.username}`);
        this.suggestedFriends = this.suggestedFriends.filter(f => f !== friend);
      },
      error: err => this.dialog.error('Từ chối lời mời thất bại')
    });
  }
}
