import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {FetchApiService} from '../../commom/service/api/fetch-api.service';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  @Input() post: any; // bài viết cần chỉnh sửa
  @Output() updated = new EventEmitter<any>(); // sự kiện thông báo đã update

  editedContent: string = '';
  editedImageUrl: string = '';

  showModal: boolean = false;

  constructor(private postService: FetchApiService) {}

  open(post: any) {
    this.post = post;
    this.editedContent = post.content;
    this.editedImageUrl = post.imageUrl || '';
    this.showModal = true;
  }

  close() {
    this.showModal = false;
  }

  save() {
    if (!this.editedContent.trim()) {
      alert('Nội dung bài viết không được để trống!');
      return;
    }

    const updatedPost = {
      ...this.post,
      content: this.editedContent,
      imageUrl: this.editedImageUrl
    };

    this.postService.updatePost(updatedPost.id, updatedPost).subscribe({
      next: () => {
        alert('Cập nhật bài viết thành công!');
        this.updated.emit(updatedPost);
        this.close();
      },
      error: ({err}: { err: any }) => {
        console.error({err: 'Lỗi khi cập nhật bài viết'}, err);
        alert('Cập nhật bài viết thất bại!');
      }
    });
  }
}
