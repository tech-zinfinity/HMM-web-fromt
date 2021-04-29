import { KeyValue } from './../model/key-value';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicForm } from './../model/dynamic-form';
import { Component, OnInit, Inject } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  dynamicForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DynamicForm[],
  public ref: MatDialogRef<DynamicFormComponent>) { 

    _.forEach(data, (element,index)=>{        
        let fControl: FormControl;
        fControl = element.required?new FormControl(element.fieldName, Validators.required):
                      new FormControl(element.fieldName);
        if(element.value!=null){
          fControl.setValue(element.value);
        }else{
          fControl.setValue(null);
        }
        this.dynamicForm.addControl(element.fieldName, fControl);
      });
  }

  ngOnInit(): void {
    
  }

  submit(form: any){

    let values: KeyValue[] = [];
    _.forEach(this.data, d =>{
      values.push({
        key:d.entityField,
        value:form[d.fieldName]
      });
    });
  this.ref.close(values);    
  }

}
