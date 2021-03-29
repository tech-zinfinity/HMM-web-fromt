import { User } from './../entities/user';
import { Hotel } from './../entities/hotel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) {}

  currentHotelSubject = new BehaviorSubject(null);
  currentHotel = this.currentHotelSubject.asObservable();

  updateHotel(hotel: Hotel){
    this.currentHotelSubject.next(hotel);
  }

  registerHotel(hotel: Hotel , user : User){
    let body ={
      hotel: hotel,
      user: user
    }
    return this.http.post(environment.apiurl+'/hotel/add',body);
  }

  getRequestedHotelsByLimit(limit){
    return this.http.get(environment.apiurl+'/hotel/getRequestedHotelsByLimit/'+limit);
  }

  getApprovedHotelsByLimit(limit){
    return this.http.get(environment.apiurl+'/hotel/getApprovedHotelsByLimit/'+limit);
  }

  getVerifiedHotelsByLimit(limit){
    return this.http.get(environment.apiurl+'/hotel/getVerifiedHotelsByLimit/'+limit);
  }

  getPublishedHotelsByLimit(limit){
    return this.http.get(environment.apiurl+'/hotel/getPublishedHotelsByLimit/'+limit);
  }

  getRejectedHotelsByLimit(limit){
    return this.http.get(environment.apiurl+'/hotel/getRejectedHotelsByLimit/'+limit);
  }

  sendActivationEmail(id){
    return this.http.get(environment.apiurl+'/hotel/sendActivationEmail/'+id, {params:{
      url: window.location.origin
    }});
  }

  approve(id: string){
    return this.http.get(environment.apiurl+'/hotel/approve/'+id, {params:{
      url: window.location.origin
    }});
  }
  verifyhotel(id: string){
    return this.http.get(environment.apiurl+'/hotel/verifyhotel/'+id);
  }

  getByEmail(email: string){
    return this.http.get(environment.apiurl+'/hotel/getHotelByEmail/'+email);
  }

  deleteMenu(menuId:string, hotelId: string){
    return this.http.get(environment.apiurl+'/ops/deleteMenu/'+menuId
    +'/'+hotelId);
  }
}
