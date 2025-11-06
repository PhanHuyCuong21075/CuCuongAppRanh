import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCommonComponent } from './dialog/dialog.component';

export interface DialogData {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  showConfirm?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  openDialog(data: DialogData) {
    return this.dialog.open(DialogCommonComponent, {
      width: '360px',
      data: data,
      panelClass: 'custom-dialog-panel'
    }).afterClosed();
  }

  success(message: string) {
    return this.openDialog({
      title: "Thành công",
      message: message,
      type: "success",
      showConfirm: false
    });
  }

  error(message: string) {
    return this.openDialog({
      title: "Lỗi",
      message: message,
      type: "error",
      showConfirm: false
    });
  }

  warning(message: string) {
    return this.openDialog({
      title: "Cảnh báo",
      message: message,
      type: "warning",
      showConfirm: false
    });
  }

  info(message: string) {
    return this.openDialog({
      title: "Thông báo",
      message: message,
      type: "info",
      showConfirm: false
    });
  }

  confirm(message: string, title: string = "Xác nhận") {
    return this.openDialog({
      title,
      message,
      type: "warning",
      showConfirm: true
    });
  }
}
