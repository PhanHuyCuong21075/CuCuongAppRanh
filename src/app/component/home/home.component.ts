import {Component, OnInit} from '@angular/core';
import {FetchApiService} from '../../commom/service/api/fetch-api.service';
import {CommonModule} from '@angular/common';
import {CreatePostComponent} from './create-post/create-post.component';
import {PostListComponent} from './post-list/post-list.component';
import {FriendListComponent} from './friend-list/friend-list.component';
import {SuggestedFriendComponent} from './suggested-friend/suggested-friend.component';
import {HeaderComponent} from '../header/header.component';
// Thêm import này ở đầu file
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CreatePostComponent,
    PostListComponent,
    FriendListComponent,
    SuggestedFriendComponent,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = '';
  friends: any[] = [];
  posts: any[] = [];

  public friendSuggestionList: any[] = [];

  constructor(private api: FetchApiService) {
  }

  handleRequestAccepted() {
    this.loadAllFriendSuggestions();
    this.loadFriends();
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    if (this.username) {
      this.loadFriends();
      this.loadPosts();

      this.loadAllFriendSuggestions();
    }
  }

  loadFriends() {
    this.api.getFriends(this.username).subscribe({
      next: res => this.friends = res.data || res,
      error: err => console.error({err: err})
    });
  }

  loadPosts() {
    this.api.getPosts(this.username).subscribe({
      next: res => this.posts = res.data || res,
      error: err => console.error({err: err})
    });
  }

  // --- HÀM MỚI (THAY THẾ 3 HÀM CŨ) ---
  /**
   */
  loadAllFriendSuggestions() {
    const suggested$ = this.api.getSuggestedFriends(this.username);
    const pending$ = this.api.getPendingRequestFriends(this.username);

    // forkJoin: Đợi cả 2 API cùng trả về kết quả
    forkJoin([suggested$, pending$]).subscribe({
      next: ([suggestedRes, pendingRes]) => {
        const suggestedData = suggestedRes.data || suggestedRes;
        const pendingData = pendingRes.data || pendingRes;

        // Gọi hàm gộp logic mới
        this.buildDisplayList(suggestedData, pendingData);
      },
      error: err => console.error({err: err})
    });
  }

  /**
   * HÀM MỚI (Logic gộp đúng)
   * Gộp 2 danh sách, xử lý type, và loại bỏ trùng lặp.
   */
  private buildDisplayList(suggested: any[], pending: any[]) {
    // 1. Tạo Map các request đang chờ
    // (Key: username, Value: type (SENT, RECEIVED...))
    const pendingMap = new Map<string, string>();
    pending.forEach(p => {
      pendingMap.set(p.user.username, p.type);
    });

    // 2. Lặp qua danh sách GỢI Ý, gán 'type' cho họ
    const suggestedWithTypes = suggested.map(user => ({
      ...user,
      type: pendingMap.get(user.username) || 'NONE'
    }));

    // 3. (Bước quan trọng bị thiếu ở code cũ)
    // Tìm những người CHỈ CÓ TRONG PENDING mà KHÔNG CÓ TRONG SUGGESTED
    const suggestedUsernames = new Set(suggested.map(s => s.username));

    const pendingOnly = pending
      .filter(p => !suggestedUsernames.has(p.user.username))
      .map(p => ({
        ...p.user,
        type: p.type   // Gán type
      }));

    // 4. Gộp 2 danh sách lại
    this.friendSuggestionList = [...suggestedWithTypes, ...pendingOnly];
  }

  // --- CÁC HÀM KHÁC GIỮ NGUYÊN ---
  onPostCreated() {
    this.loadPosts();
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
