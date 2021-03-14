import { MatSnackBar } from '@angular/material/snack-bar';
import { Menu } from './../../entities/menu';
import { HotelOperationsService } from './../../services/hotel-operations.service';
import { FireStorageService } from './../../services/fire-storage-service.service';
import { Hotel } from './../../entities/hotel';
import { HotelService } from './../../services/hotel.service';
import { Component, OnInit } from '@angular/core';
import { SharedObjectService } from 'src/app/services/shared-object.service';

@Component({
  selector: 'app-vendor-view-menu',
  templateUrl: './vendor-view-menu.component.html',
  styleUrls: ['./vendor-view-menu.component.scss']
})
export class VendorViewMenuComponent implements OnInit {

  constructor(private hotelService: HotelService,
    private storage: FireStorageService,
    private ops: HotelOperationsService,
    private share: SharedObjectService,
    private snackbar: MatSnackBar) { }

  hotel: Hotel;
  menus: Menu[] = [];

  ngOnInit(): void {
    this.hotelService.currentHotel.subscribe((d: Hotel) =>{
      this.hotel = d;        
      if(this.hotel) 
      if(this.hotel.tables)
      this.hotel.tables.forEach(table =>{
        this.storage.getPics('TABLE'+'/'+table.qrLink).subscribe(e =>{
          table.link = e;
        },err=>{
          console.log(err);
        })
      }) 
      if(this.hotel)
      this.ops.getMenusByHotelId(d.id).subscribe((menus: Menu[]) =>{
        if(menus)        
        this.menus = menus;
      }, err=>{
        this.snackbar.open('Menus not available', 'close', {duration: 2000})
      })    

    })

  }

}
