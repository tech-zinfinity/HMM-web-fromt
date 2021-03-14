import { HotelOperationsService } from './services/hotel-operations.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SharedObjectService } from './services/shared-object.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'HotelManagement';

  constructor(private auth: AuthService,
    private ops: HotelOperationsService,
    private share: SharedObjectService){}

  ngOnInit(){
    if(localStorage.getItem('hmmtoken')){
      this.auth.updateUser(JSON.parse(localStorage.getItem('hmmuser'))
        ,localStorage.getItem('hmmtoken'))
    }
    this.ops.getAllCategories('CATEGORY').subscribe((data: string[]) =>{
      this.share.updateMenuCategories(data);
    }, err=>{

    })
  }
}
