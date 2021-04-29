import { DynamicFormControlType } from './../constants/form-control-type.enum';
export interface DynamicForm {
    fieldName?: string;
    entityField?:string;
    value?:any;
    placeHolder?:string;
    required?:boolean;
    type?:DynamicFormControlType;
    options?:any[];
}
