import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.publishMessage(data);
   }

  public message:string =  null

  ngOnInit(): void {
  }

  public publishMessage(message: string){
    this.message = message;
  } 
}
