import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FetchApiService} from '../../../commom/service/api/fetch-api.service';
import {DialogCommonComponent} from '../../../commom/dialog/dialog.component';
import {DialogService} from '../../../commom/dialog.service';


@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  @Input() post: any;
  @Output() updated = new EventEmitter<any>();

  editedContent: string = '';
  editedImageUrl: string = '';
  editedIsPublic: number = 1;
  showModal: boolean = false;

  constructor(private postService: FetchApiService,
              private dialog: DialogService,
  ) {
  }

  open(post: any) {
    this.post = post;
    this.editedContent = post.content;
    this.editedImageUrl = post.imageUrl || '';
    this.editedIsPublic = post.isPublic
    this.showModal = true;
  }

  close() {
    this.showModal = false;
  }

  save() {
    if (!this.editedContent.trim()) {
      this.dialog.warning('Nội dung bài viết không được để trống!');
      return;
    }

    const updatedPost = {
      ...this.post,
      content: this.editedContent,
      imageUrl: this.editedImageUrl,
      isPublic: this.editedIsPublic
    };

    this.postService.updatePost(updatedPost.id, updatedPost).subscribe({
      next: () => {
        this.dialog.success('Cập nhật bài viết thành công!');
        this.updated.emit(updatedPost);
        this.close();
      },
      error: ({err}: { err: any }) => {
        this.dialog.error('Lỗi khi cập nhật bài viết');
        alert('Cập nhật bài viết thất bại!');
      }
    });
  }
}
