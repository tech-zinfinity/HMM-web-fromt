import { ProgressServiceService } from './../../services/progress-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericResponse } from './../../entities/generic-response';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private userService: UserService, 
    private snackbar: MatSnackBar,
    private spinner: ProgressServiceService,
    private router: Router) { }

    email: string;
    otpsentflag: boolean = false;

    otpboxcontrol = new FormControl('', []);

    passControl = new FormControl(null, []);
    cpassControl = new FormControl(null, []);

  ngOnInit(): void {
    let spin = this.spinner.open();
    this.route.params.subscribe(e =>{
      this.email = e.email;
      this.userService.sendotp(this.email).subscribe((data: GenericResponse<any>)=>{
        spin.close();
        if(data.code === "OK"){
          this.snackbar.open(data.message, 'close', {duration: 2000});
        }else{
          this.snackbar.open(data.message, 'close', {duration: 2000});
        }
      }, err=>{
        spin.close();
      });
    });
  }

  verifyOtp(otp: string){    
    this.userService.verifyotp(this.email, otp).subscribe((data: boolean) =>{
      if(data){
        this.otpsentflag = true;
      }else{
        this.otpsentflag = false;
        this.snackbar.open('Wrong OTP, please try again', 'close', {duration: 2000});
      }
    }, err=>{
      console.log(err);
      
    });
  }

  submit(password: string){
    let spin = this.spinner.open();
    this.userService.activate(password, this.email).subscribe((data: GenericResponse<any>)=>{
      spin.close();
      if(data.code === "OK"){
        this.snackbar.open(data.message, 'close', {duration:2000});
        this.router.navigate(['/login']);
      }else{
        this.snackbar.open(data.message, 'close', {duration:2000});
      }
    }, er=>{
      spin.close();
    });
  }

}
