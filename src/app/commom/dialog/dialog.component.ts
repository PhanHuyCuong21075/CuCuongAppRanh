import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  imports: [CommonModule, MatDialogModule],
  styleUrls: ['./dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogCommonComponent implements OnInit {
  title!: String;
  message!: String;
  showConfirm: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<DialogCommonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
    if (this.data["showConfirm"] === false) {
      this.showConfirm = false;
    }
  }

  doConfirm(): void {
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
