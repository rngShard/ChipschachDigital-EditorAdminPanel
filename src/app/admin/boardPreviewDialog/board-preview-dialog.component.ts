import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-board-preview-dialog',
  templateUrl: 'board-preview-dialog.component.html',
  styleUrls: ['board-preview-dialog.component.scss']
})
export class BoardPreviewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BoardPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
}
