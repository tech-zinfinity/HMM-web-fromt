import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userservice: UserService) { }

  JWTSubject = new BehaviorSubject(null);
  JWTObs = this.JWTSubject.asObservable();

  updateUser(user: User, token: string){
    localStorage.setItem('hmmuser', JSON.stringify(user));
    localStorage.setItem('hmmtoken', token);
    this.JWTSubject.next(token);
  }

  removeUser(){
    localStorage.removeItem('hmmuser');
    localStorage.removeItem('hmmtoken');
  }

  getUser(): User{
    return JSON.parse(localStorage.getItem('hmmuser'));
  }

  getJWT(): string{
    return localStorage.getItem('hmmtoken');
  }
}
