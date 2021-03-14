import { HotelService } from './../../services/hotel.service';
import { User } from './../../entities/user';
import { Hotel } from './../../entities/hotel';
import { GenericResponse } from './../../entities/generic-response';
import { Router } from '@angular/router';
import { ProgressServiceService } from './../../services/progress-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-add-hotels',
  templateUrl: './add-hotels.component.html',
  styleUrls: ['./add-hotels.component.scss']
})
export class AddHotelsComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private userService: UserService, 
    private snackbar: MatSnackBar,
    private spinner: ProgressServiceService,
    private router: Router,
    private hotelService: HotelService) { }

  emailForm : FormGroup;
  otpForm: FormGroup;
  isLinear = true;
  otpSendflag: boolean = false;
  isverified: boolean =false;
  hoteluserform: FormGroup;
  email: string;
  @ViewChild('stepper') private myStepper: MatStepper;

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      'email':[null, Validators.required]
    });

    this.otpForm = this.fb.group({
      'otp':[null, Validators.required]
    });

    this.hoteluserform = this.fb.group({
      'name': [null, Validators.required],
      'phone1': [null, Validators.required],
      'line1': [null, Validators.required],
      'line2': [null, Validators.required],
      'landmark': [null, Validators.required],
      'pincode': [null, Validators.required],
      'city': [null, Validators.required],
      'state': [null, Validators.required],
      'country': [null, Validators.required]
    });
  }

  sendOtp(email: string){
    let spin = this.spinner.open();
    this.email = email;
    this.userService.sendotp(email).subscribe((data: GenericResponse<any>)=>{
      spin.close();
      if(data.code === "OK"){
        this.snackbar.open(data.message, 'close', {duration: 2000});
        this.myStepper.next();
      }else{
        this.snackbar.open(data.message, 'close', {duration: 2000});
      }
    }, err=>{
      spin.close();
    });
  }

  verifyOtp(otp: string){    
    this.userService.verifyotp(this.emailForm.get('email').value, otp).subscribe((data: boolean) =>{
      if(data){
        this.myStepper.next();
      }else{
        this.myStepper.previous();
        this.snackbar.open('Wrong OTP, please try again', 'close', {duration: 2000});
      }
    }, err=>{
      console.log(err);
      
    });
  }

  submit(form: any){
    let user = {
      email: this.email,
      username: this.email
    }

    let hotel : Hotel ={
      address: {
        line1: form.line1,
        line2: form.line2,
        city: form.city,
        country: form.country,
        landmark: form.landmark,
        pincode: form.pincode,
        state: form.state
      },
      contactinfo:{
        phone1: form.phone1
      },
      name: form.name
    }

    let spin = this.spinner.open();
    this.hotelService.registerHotel(hotel, user).subscribe((data: GenericResponse<any>) =>{
      spin.close();
      if(data.code === 'OK'){
        this.router.navigate(['/admin'])
      }else{
        this.snackbar.open(data.message, 'close', {duration: 2000});
      }
    }, err=>{
        console.log(err);

    });
  }

}
