import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-prediction-dialog',
  templateUrl: './prediction-dialog.component.html',
  styleUrls: ['./prediction-dialog.component.css']
})
export class PredictionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PredictionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
}
