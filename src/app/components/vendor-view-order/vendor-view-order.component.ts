import { DynamicFormControlType } from './../common/constants/form-control-type.enum';
import { DynamicFormService } from './../common/dynamic-form.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-view-order',
  templateUrl: './vendor-view-order.component.html',
  styleUrls: ['./vendor-view-order.component.scss']
})
export class VendorViewOrderComponent implements OnInit {

  constructor(private dformService: DynamicFormService) { }

  ngOnInit(): void {
  }

  openForm(){
    this.dformService.open([{
      fieldName:'name',
      entityField:'name',
      value:null,
      placeHolder:'name',
      required: true,
      type:DynamicFormControlType.text
    },
    {
      fieldName:'name',
      entityField:'lastName',
      value:['some', 'else'],
      placeHolder:'Last Name',
      required: true,
      type:DynamicFormControlType.multiselect,
      options:['some', 'else', 'ju']
    },
    {
      fieldName:'date',
      entityField:'date',
      value:null,
      placeHolder:'select date',
      required: false,
      type:DynamicFormControlType.date
    },
    {
      fieldName:'Essential',
      entityField:'Essential',
      value:true,
      placeHolder:'Ess',
      required: false,
      type:DynamicFormControlType.boolean
    },
    {
      fieldName:'some',
      entityField:'ssmsmsm',
      value:null,
      placeHolder:'select date',
      required: false,
      type:DynamicFormControlType.date
    },
    ]);
  }
}
