import { ConfirmationBoxComponent } from './confirmation-box/confirmation-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private dialog: MatDialog) { }

  open(status: string, message: any){
    return this.dialog.open(ConfirmationBoxComponent,
      {data: {status: status, message: message},
      disableClose:true, panelClass:'confirmation-box'});
  }

}
