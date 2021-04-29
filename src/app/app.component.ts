import { HotelOperationsService } from './services/hotel-operations.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SharedObjectService } from './services/shared-object.service';

import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'HotelManagement';
  connectedToInternet: boolean = true;

  constructor(private auth: AuthService,
    private ops: HotelOperationsService,
    private share: SharedObjectService){}

  internetConnectionStatus: boolean = true;

  ngOnInit(){
    if(localStorage.getItem('hmmtoken')){
      this.auth.updateUser(JSON.parse(localStorage.getItem('hmmuser'))
        ,localStorage.getItem('hmmtoken'))
    }
    this.ops.getAllCategories('CATEGORY').subscribe((data: string[]) =>{
      this.share.updateMenuCategories(data);
    }, err=>{

    });

    // this.onlineStatus().subscribe(connect =>{      
    //   if(connect){
    //     this.connectedToInternet = true;
    //   }else{
    //     this.connectedToInternet = false;
    //   }
    // });
  }

  // onlineStatus() {
  //   console.log(fromEvent(window, 'offline').pipe(map(() => false)));
  //   console.log(fromEvent(window, 'online').pipe(map(() => true)));
  //   console.log(navigator.onLine);
    
  //   return merge<boolean>(
      
  //     fromEvent(window, 'offline').pipe(map(() => false)),
  //     fromEvent(window, 'online').pipe(map(() => true)),
  //     new Observable((sub: Observer<boolean>) => {
  //       sub.next(navigator.onLine);
  //       sub.complete();
  //     }));
  // }
}
