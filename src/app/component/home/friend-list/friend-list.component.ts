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
  @Output() requestSent = new EventEmitter<number>();


  constructor(private dialog: DialogService,
              private apiService: FetchApiService) {
  }


  onRemoveFriend(friend: any) {
    friend.isLoading = true;
    this.apiService.sendFriendRequest(friend.id).subscribe({
      next: () => {
        this.dialog.success(`Đã huỷ ket bạn voi: ${friend.username}`);
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
