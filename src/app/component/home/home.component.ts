import { Component, OnInit } from '@angular/core';
import { FetchApiService } from '../../commom/service/api/fetch-api.service';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { SuggestedFriendComponent } from './suggested-friend/suggested-friend.component';
import {HeaderComponent} from '../header/header.component';
import { DialogService } from '../../commom/dialog.service';


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

  constructor(private api: FetchApiService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    if (this.username) {
      this.loadFriends();
      this.loadSuggestedFriends();
      this.loadPosts();
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

  loadSuggestedFriends() {
    this.api.getSuggestedFriends(this.username).subscribe({
      next: res => this.suggestedFriends = res.data || res,
      error: err => console.error({err: err})
    });
  }

  onPostCreated() {
    this.loadPosts();
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
