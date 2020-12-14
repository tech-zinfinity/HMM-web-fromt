import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userservice: UserService) { }

  updateUser(user: User){
    localStorage.setItem('hmmuser', JSON.stringify(user));
  }

  removeUser(){
    localStorage.removeItem('hmmuser');
  }

  getUser(): User{
    return JSON.parse(localStorage.getItem('hmmuser'));
  }
}
