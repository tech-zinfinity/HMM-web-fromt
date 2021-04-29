import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss']
})
export class ConfirmationBoxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public ref: MatDialogRef<ConfirmationBoxComponent>) { }

  ngOnInit(): void {
  } 

}
