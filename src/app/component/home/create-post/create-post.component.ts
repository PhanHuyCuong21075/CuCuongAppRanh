import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FetchApiService } from '../../../commom/service/api/fetch-api.service';
import { DialogService } from '../../../commom/dialog.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  @Output() postCreated = new EventEmitter<void>();

  newPostContent = '';
  isPublic: any = 1;

  constructor(private api: FetchApiService,
              private dialog: DialogService,
              ) {}

  createPost() {
    if (!this.newPostContent.trim()) return;

    const postData = {
      username: localStorage.getItem('username'),
      content: this.newPostContent,
      imageUrl: '',
      isPublic: this.isPublic ? 1 : 0
    };

    this.api.createPost(postData).subscribe({
      next: () => {
       this.dialog.success('✅ Đăng bài thành công');
        this.newPostContent = '';
        this.postCreated.emit();
      },
      error: (err) => this.dialog.error(err)
    });
  }
}
