import { FireStorageService } from './../../services/fire-storage-service.service';
import { GenericResponse } from './../../entities/generic-response';
import { Hotel } from './../../entities/hotel';
import { HotelService } from './../../services/hotel.service';
import { TableService } from './../../services/table.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import * as uuid from 'uuid';

@Component({
  selector: 'app-vendor-main',
  templateUrl: './vendor-main.component.html',
  styleUrls: ['./vendor-main.component.scss']
})
export class VendorMainComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  hotel: Hotel;

  constructor(private auth: AuthService,
    private router: Router,
    private tableService: TableService,
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private storage: FireStorageService) { }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.hotelService.getByEmail(id).subscribe((data: GenericResponse<any>) =>{
      this.hotel = data.body;
      console.log(this.hotel);
      this.hotelService.updateHotel(this.hotel);
    }, err=>{
      console.log(err);
      
    })
  }

  registerTable(){
    let uid = uuid.v1();
    uid = this.hotel.id+'-'+uid;
    console.log("UID "+uid);
    this.tableService.registerTable(this.hotel.id, '1',uid).subscribe((d: File) =>{
        this.storage.uploadToStoragePNG(d,'TABLE', uid+'-'+'1')
        .then(          
          object =>{
            let name = object.metadata.name;
            console.log(name);
            console.log(object.metadata.fullPath);
            this.tableService.registerTableQR(this.hotel.id, '1', object.metadata.name, uid).subscribe(d=>{
              this.hotel = d;
              this.hotelService.updateHotel(this.hotel);
            }, err=>{
              console.log(err);
              
            })
          }, 
          error=>{
            console.log(error);
          }
        );
    }, err=>{
      console.log(err);
      
    });
  }

  logout(){
    this.auth.removeUser();
    this.router.navigate(['/login']);
  }

  registerHotel(){

  }
}
