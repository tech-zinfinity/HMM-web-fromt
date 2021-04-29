import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar.component';

@Injectable({
  providedIn: 'root'
})
export class Spinner {

  constructor(private dialog: MatDialog) { }

  open(message?:string) : MatDialogRef<ProgressBarComponent>{
    return this.dialog.open(ProgressBarComponent, {
      // panelClass: 'back-black',
      // backdropClass:'green-backdrop',
      disableClose: true,
      data: message
    });
  }

  close(ref: MatDialogRef<ProgressBarComponent>) {
    ref.close();
  }
  

}
