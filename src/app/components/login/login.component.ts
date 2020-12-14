import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, 
    private userService: UserService, 
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login(username: string, password: string){
    if(username&&password){

    }else{
      this.snackbar.open('Username or Password is empty');
    }
  }
}
