import { SupportTicket } from './../../entities/support-ticket';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-support',
  templateUrl: './vendor-support.component.html',
  styleUrls: ['./vendor-support.component.scss']
})
export class VendorSupportComponent implements OnInit {

  supportForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.supportForm = fb.group({
      'title':[null, Validators.required],
      'description':[null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  resetsupportForm(){

  }

  addTicket(value: SupportTicket){

  }

}
