import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogService} from '../../../commom/dialog.service';
import {FetchApiService} from '../../../commom/service/api/fetch-api.service';

@Component({
  selector: 'app-friend-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent {
  @Input() friends: any[] = [];

  /** (SỬA)
   * Đổi tên Output cho đúng ý nghĩa:
   * Báo cho component cha (home) biết rằng danh sách cần được load lại.
   */
  @Output() listChanged = new EventEmitter<void>();


  constructor(private dialog: DialogService,
              private apiService: FetchApiService) {
  }


  onRemoveFriend(friend: any) {
    friend.isLoading = true;
    // (FIX) Giả sử API huỷ kết bạn cũng là sendFriendRequest(id)
    this.apiService.sendFriendRequest(friend.id).subscribe({
      next: () => {
        this.dialog.success(`Đã huỷ kết bạn với: ${friend.username}`);

        /** (SỬA)
         * Thay vì emit 'requestSent', chúng ta emit 'listChanged'
         * để báo cho 'home.component' load lại danh sách.
         */
        this.listChanged.emit();

        // Không cần 'isLoading = false' vì component sẽ được load lại
      },
      error: (err) => {
        const errorMessage = err.error?.errorDesc || 'Có lỗi xảy ra, vui lòng thử lại.';
        this.dialog.error(errorMessage);
        friend.isLoading = false; // Trả lại trạng thái nếu lỗi
      }
    })
  }
}
