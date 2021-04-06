import { Hotel } from './../../entities/hotel';
import { HotelService } from './../../services/hotel.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {

  constructor(public hotelService: HotelService) { }

  hotel: Hotel;

  ngOnInit(): void {
    this.hotelService.currentHotel.subscribe(h =>{
      console.log(h);
      
      this.hotel = h;
    });

  }

}
