import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FetchApiService} from '../../../commom/service/api/fetch-api.service';
import {EditPostComponent} from '../edit-post/edit-post.component';
import { DialogService } from '../../../commom/dialog.service';


@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, EditPostComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  @Input() posts: any[] = [];
  constructor(private api: FetchApiService,
              private dialog: DialogService,) {}

  editPost(post: any) {
    console.log("Chỉnh sửa bài viết:", post);
    // TODO: mở dialog hoặc form chỉnh sửa
  }

  deletePost(post: any) {
    this.dialog.confirm("Bạn có chắc chắn muốn xóa bài viết này?")
      .subscribe(res => {
        if (res) {
          this.api.deletePost(post.id).subscribe(() => {
            this.posts = this.posts.filter(p => p.id !== post.id);
          });
        }
      });
  }

  sharePost(post: any) {
    console.log("Chia sẻ bài viết:", post);
    // TODO: xử lý logic chia sẻ (copy link, repost,...)
  }

  toggleMenu(post: any) {
    // Đóng menu của các bài khác
    this.posts.forEach(p => {
      if (p !== post) p.showMenu = false;
    });
    // Toggle menu của bài hiện tại
    post.showMenu = !post.showMenu;
  }

  onPostUpdated(updatedPost: any) {
    this.posts = this.posts.map(p => p.id === updatedPost.id ? updatedPost : p);
  }

}
