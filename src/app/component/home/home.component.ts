import {Component, OnInit} from '@angular/core';
import {FetchApiService} from '../../commom/service/api/fetch-api.service';
import {CommonModule} from '@angular/common';
import {CreatePostComponent} from './create-post/create-post.component';
import {PostListComponent} from './post-list/post-list.component';
import {FriendListComponent} from './friend-list/friend-list.component';
import {SuggestedFriendComponent} from './suggested-friend/suggested-friend.component';
import {HeaderComponent} from '../header/header.component';
import {DialogService} from '../../commom/dialog.service';


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
  suggestedFriends: any[] = [];
  pendingRequestFriends: any [] = [];

  constructor(private api: FetchApiService) {
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    if (this.username) {
      this.loadFriends();
      this.loadSuggestedFriends();
      this.loadPendingRequestFriends();
      this.loadPosts();
    }
  }

  get allFriendsSuggestions() {
    return [...this.suggestedFriends, ...this.pendingRequestFriends];
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

  loadSuggestedFriends() {
    this.api.getSuggestedFriends(this.username).subscribe({
      next: res => {
        this.suggestedFriends = res.data || res
        this.mergeSuggestedWithPending()
      },
      error: err => console.error({err: err})
    });
  }

  loadPendingRequestFriends() {
    this.api.getPendingRequestFriends(this.username).subscribe({
      next: res => {
        this.pendingRequestFriends = res.data || res;
        this.mergeSuggestedWithPending()
      },
      error: err => console.error({err: err})
    });
  }

  mergeSuggestedWithPending() {
    if (!this.suggestedFriends.length || !this.pendingRequestFriends.length) {
      return;
    }
    const pendingMap = new Map<string, string>();

    this.pendingRequestFriends.forEach(p => {
      pendingMap.set(p.user.username, p.type);
    });
    this.suggestedFriends = this.suggestedFriends.map(s => ({
      ...s,
      type: pendingMap.get(s.username) || "NONE"
    }));
  }

  onPostCreated() {
    this.loadPosts();
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
