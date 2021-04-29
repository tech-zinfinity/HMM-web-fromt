import { ConfirmationService } from './confirmation.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicForm } from './model/dynamic-form';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { DynamicFormControlType } from './constants/form-control-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor(private dialog: MatDialog,
    private confirm: ConfirmationService) { }

  open(fields: DynamicForm[]) : MatDialogRef<DynamicFormComponent>{
    let result = this.verifyDynamicForm(fields);
    if(result.length===0){
      return this.dialog.open(DynamicFormComponent, {
        height: 'auto',
        width: 'auto',
        data: fields
      })
    }else{
      this.confirm.open('info', 'Validation Failed  ! '+result);
    }
  }

  private verifyDynamicForm(fields:DynamicForm[]): string[]{
      let messages: string[] = [];

    _.forEach((fields), (f, i)=>{      
      if(!(f.fieldName) || !(f.entityField) || !(f.type)){
        messages.push('field name, entity field name or type of control is null for index ', i.toString());
      }
      if(f.type === DynamicFormControlType.multiselect ||
        f.type === DynamicFormControlType.select){
          if(!(f.options)){
            messages.push('No options available for index ',i.toString());
          }else{
            if(f.options.length<=0){
              messages.push('No options available for index ',i.toString());
            }
          }
      }
      _.uniq(_.map(fields, d=>d.fieldName)).length
      <(_.map(fields, d=>d.fieldName)).length
      ?messages.push('Duplicate field names'):messages.push();

      _.uniq(_.map(fields, d=>d.entityField)).length
      <(_.map(fields, d=>d.entityField)).length
      ?messages.push('Duplicate entity field names'):messages.push();

    });

    return _.uniq(messages);
  }
}
