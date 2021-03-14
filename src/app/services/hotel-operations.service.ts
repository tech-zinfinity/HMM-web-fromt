import { Menu } from './../entities/menu';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelOperationsService {

  constructor(private http: HttpClient) { }

  getMenusByHotelId(id: string){
    return this.http.get(environment.apiurl+'/ops/getMenusByHotelId'+'/'+id);
  }

  addMenubyCategory(id: string, menu: Menu){
    return this.http.post(environment.apiurl+'/ops/addMenubyCategory'+'/'+id, menu);
  }

  addKeyandValue(key: string, value: string){
    return this.http.get(environment.apiurl+'/ops/addKeyandValue'+'/'+key+'/'+value);
  }

  getAllCategories(key: string){
    return this.http.get(environment.apiurl+'/ops/getAllCategories'+'/'+key);
  }
}
