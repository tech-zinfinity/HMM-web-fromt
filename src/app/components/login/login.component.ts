import { Router } from '@angular/router';
import { User } from './../../entities/user';
import { ProgressServiceService } from './../../services/progress-service.service';
import { GenericResponse } from './../../entities/generic-response';
import { FormControl } from '@angular/forms';
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
    private snackbar: MatSnackBar,
    private spinner: ProgressServiceService,
    private router: Router) { }

  usernameControl = new FormControl(null, []);
  passControl = new FormControl(null, []);

  ngOnInit(): void {
  }

  login(username: string, password: string){
    let spin  = this.spinner.open();
    if(username&&password){
      this.userService.login(username, password).subscribe((data: GenericResponse<User>) =>{
        spin.close();
        console.log(data);
        
        if(data.code === "OK"){
          this.auth.updateUser(data.body);
          if(data.body.roles.includes('ADMIN')){
            this.router.navigate(['/admin'])
          }else if(data.body.roles.includes('HOTEL')){
            this.router.navigate(['/vendor'])
          }
        }else{
          spin.close();
          this.snackbar.open('Incorrect credentials, please try again', 'close', {duration: 2000});
        }
      }, err=>{
        spin.close();
        this.snackbar.open('Service is down', 'close', {duration: 2000});
      });
      
    }else{
      spin.close();
      this.snackbar.open('Username or Password is empty', 'close', {duration: 2000});
    }
  }
}
