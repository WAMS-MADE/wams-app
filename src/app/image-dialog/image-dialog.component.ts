import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    // will log the entire data object
    console.log(this.data)
  }

}
