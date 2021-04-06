import { environment } from './../../environments/environment';
import { Notification } from './../entities/notification';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  publish(notification:Notification){
    return this.http.post(environment.apiurl+'/notify/publish', notification);
  }

  getForUser(id: string){
    return this.http.get(environment.apiurl+'/notify/getForUser/'+id);
  }

  removeForUser(id: string, userId: string){
    return this.http.get(environment.apiurl+'/notify/removeForUser/'+id+'/'+userId);
  }
}
