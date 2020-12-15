import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  sendotp(emailid: string){
    return this.http.get(environment.apiurl+'/user/sendotp/'+emailid);
  }
  verifyotp(emailid: string, otp: string){
    return this.http.get(environment.apiurl+'/user/verifyotp/'+emailid+'/'+otp);
  }
  signup(user: User){
    return this.http.post(environment.apiurl+'/user/signup', user);
  }
  login(username, password){
    return this.http.get(environment.apiurl+'/user/login/'+username+'/'+password);
  }
  activate(password, email){
    return this.http.get(environment.apiurl+'/user/activate/'+password+'/'+email);
  }
}
