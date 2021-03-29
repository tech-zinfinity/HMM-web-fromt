import { environment } from './../../environments/environment';
import { Menu } from './../entities/menu';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  addMenubyCategory(id:string, menu: Menu){
    return this.http.post(environment.apiurl+'/ops/addMenubyCategory/'+id,menu);
  }
}
