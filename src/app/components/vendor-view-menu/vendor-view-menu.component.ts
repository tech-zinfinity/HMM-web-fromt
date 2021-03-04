import { FireStorageService } from './../../services/fire-storage-service.service';
import { Hotel } from './../../entities/hotel';
import { HotelService } from './../../services/hotel.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-view-menu',
  templateUrl: './vendor-view-menu.component.html',
  styleUrls: ['./vendor-view-menu.component.scss']
})
export class VendorViewMenuComponent implements OnInit {

  constructor(private hotelService: HotelService,
    private storage: FireStorageService) { }

  hotel: Hotel;
  ngOnInit(): void {
    this.hotelService.currentHotel.subscribe(d =>{
      this.hotel = d;  
      if(this.hotel) 
      if(this.hotel.tables)
      this.hotel.tables.forEach(table =>{
        this.storage.getPics('TABLE'+'/'+table.qrLink).subscribe(e =>{
          console.log(e);
          table.link = e;
        },err=>{
          console.log(err);
        })
      })   
    })
  }

}
