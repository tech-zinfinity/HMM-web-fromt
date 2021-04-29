import { DynamicFormService } from './../common/dynamic-form.service';
import { ConfirmationService } from './../common/confirmation.service';
import { Spinner } from './../../services/progress-service.service';
import { Hotel } from './../../entities/hotel';
import { HotelService } from './../../services/hotel.service';
import { Component, OnInit } from '@angular/core';
import { DynamicFormControlType } from '../common/constants/form-control-type.enum';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {

  constructor(public hotelService: HotelService,
    public spinner:Spinner,
    public confirm: ConfirmationService,
    public dForm: DynamicFormService) { }

  hotel: Hotel;

  ngOnInit(): void {
    let spin = this.spinner.open();
    this.hotelService.currentHotel.subscribe(h =>{
      spin.close();      
      this.hotel = h;
    });

  }

  scrollTo(el: HTMLElement) {    
    el.scrollIntoView({ behavior:'smooth', block:'center'});
  }

  editHotelName(){
    this.dForm.open([{
      fieldName:'HotelName',
      entityField:'name',
      value:this.hotel.name,
      required:false,
      type:DynamicFormControlType.text
    }])
  }

}
