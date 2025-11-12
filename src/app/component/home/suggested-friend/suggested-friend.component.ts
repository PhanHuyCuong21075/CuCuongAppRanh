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

  /** (SỬA) Đổi tên 2 Output cho rõ ràng:
   * listChanged: Dùng khi Gửi/Huỷ (Chỉ cần load lại danh sách gợi ý)
   * requestHandled: Dùng khi Chấp nhận/Từ chối (Cần load lại cả danh sách gợi ý VÀ danh sách bạn bè)
   */
  @Output() listChanged = new EventEmitter<void>();
  @Output() requestHandled = new EventEmitter<void>();

  constructor(private dialog: DialogService,
              private apiService: FetchApiService) { }

  /**
   * 1. Gửi lời mời (type: 'NONE')
   */
  onAddFriend(friend: any) {
    friend.isLoading = true;
    this.apiService.sendFriendRequest(friend.id).subscribe({
      next: () => {
        this.dialog.success(`Đã gửi lời mời đến: ${friend.username}`);
        // (XÓA) friend.type = 'SENT';
        this.listChanged.emit(); // (THÊM) Báo cho cha biết
      },
      error: (err) => {
        const errorMessage = err.error?.errorDesc || 'Có lỗi xảy ra, vui lòng thử lại.';
        this.dialog.error(errorMessage);
        friend.isLoading = false; // Vẫn giữ isLoading để xử lý lỗi
      }
      // Không cần 'isLoading = false' ở 'next' vì danh sách sẽ được load lại
    });
  }

  /**
   * 2. Huỷ lời mời (type: 'SENT')
   */
  cancelRequest(friend: any) {
    this.apiService.sendFriendRequest(friend.id).subscribe({
      next: () => {
        this.dialog.success(`Đã huỷ lời mời đến: ${friend.username}`);
        // (XÓA) friend.type = 'NONE';
        this.listChanged.emit(); // (THÊM) Báo cho cha biết
      },
      error: err => this.dialog.error('Huỷ lời mời thất bại')
    });
  }

  /**
   * 3. Chấp nhận lời mời (type: 'RECEIVED')
   */
  acceptRequest(friend: any) {
    this.apiService.sendFriendRequest(friend.id).subscribe({
      next: () => {
        this.dialog.success(`Đã chấp nhận lời mời từ: ${friend.username}`);
        // (XÓA) this.suggestedFriends = this.suggestedFriends.filter(f => f.id !== friend.id);
        this.requestHandled.emit(); // (GIỮ NGUYÊN) Báo cho cha biết
      },
      error: err => this.dialog.error('Chấp nhận lời mời thất bại')
    });
  }

  /**
   * 4. Từ chối lời mời (type: 'RECEIVED')
   */
  rejectRequest(friend: any) {
    this.apiService.rejectFriendRequest(friend.id).subscribe({
      next: () => {
        this.dialog.success(`Đã từ chối lời mời từ: ${friend.username}`);
        this.requestHandled.emit();
      },
      error: err => this.dialog.error('Từ chối lời mời thất bại')
    });
  }
}
