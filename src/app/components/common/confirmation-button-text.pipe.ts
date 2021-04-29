import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'confirmationButtonText'
})
export class ConfirmationButtonTextPipe implements PipeTransform {

  transform(value: unknown): unknown {
    if(value === 'question'){
      return {ok:'Yes', cancel:'No', color: 'black'};
    }
    if(value === 'warn'){
      return {ok:'Proceed', cancel:'Discard', color: 'white'};
    }
    return {ok:'Ok', cancel:'Cancel', color: 'white'};
  }

}
