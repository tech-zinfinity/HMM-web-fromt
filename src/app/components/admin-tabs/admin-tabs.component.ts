import { Spinner } from './../../services/progress-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericResponse } from './../../entities/generic-response';
import { Hotel } from './../../entities/hotel';
import { HotelService } from './../../services/hotel.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-tabs',
  templateUrl: './admin-tabs.component.html',
  styleUrls: ['./admin-tabs.component.scss']
})
export class AdminTabsComponent implements OnInit {

  constructor(private hotelService: HotelService,
    private snackbar: MatSnackBar,
    private spinner: Spinner) { }

  requestedHotesl: Hotel[] = [];
  approvedHotels: Hotel[] = [];
  rejectedHotels: Hotel[] = [];
  verifiedHotels: Hotel[] = [];
  publishedHotels: Hotel[] = [];

  ngOnInit(): void {
    this.hotelService.getRequestedHotelsByLimit(5).subscribe((data:Hotel[]) =>{
      this.requestedHotesl = data;      
    },err=>{
      this.requestedHotesl = [];
    });

    this.hotelService.getApprovedHotelsByLimit(5).subscribe((data:Hotel[]) =>{
      this.approvedHotels = data;      
    },err=>{
      this.approvedHotels = [];
    });

    this.hotelService.getVerifiedHotelsByLimit(5).subscribe((data:Hotel[]) =>{
      this.verifiedHotels = data;            
    },err=>{
      this.verifiedHotels = [];
    });

    this.hotelService.getPublishedHotelsByLimit(5).subscribe((data:Hotel[]) =>{
      this.publishedHotels = data;      
    },err=>{
      this.publishedHotels = [];
    });

    this.hotelService.getRejectedHotelsByLimit(5).subscribe((data:Hotel[]) =>{
      this.rejectedHotels = data;      
    },err=>{
      this.rejectedHotels = [];
    });
    
  }

  approve(hotel: Hotel){
    let spin = this.spinner.open();
    this.hotelService.approve(hotel.id).subscribe((data: GenericResponse<any>)=>{
      spin.close();
      if(data.code === "OK"){
        this.requestedHotesl.splice(this.requestedHotesl.indexOf(hotel), 1);
        this.approvedHotels.push(data.body);
        this.snackbar.open(data.message, 'close', {duration: 2000});
      }else{
        this.snackbar.open(data.message, 'close', {duration: 2000});
      }
    }, err=>{
      spin.close();
      this.snackbar.open("error", 'close', {duration: 2000});
    });
  }

  sendActivationEmail(hotel: Hotel){
    let spin = this.spinner.open();
    this.hotelService.sendActivationEmail(hotel.user.id).subscribe((data: boolean)=>{
      spin.close();
      if(data){
        this.snackbar.open("Sent successfully", 'close', {duration: 2000});
      }else{
        this.snackbar.open("Sending failed", 'close', {duration: 2000});
      }
    }, err=>{    
      spin.close();  
      this.snackbar.open("error", 'close', {duration: 2000});
    });
  }

}
