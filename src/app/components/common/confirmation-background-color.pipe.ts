import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'confirmationBackgroundColor'
})
export class ConfirmationBackgroundColorPipe implements PipeTransform {

  transform(value: unknown): unknown {
    if(value === 'success'){
      return  'rgb(20, 153, 20)'
    }
    if(value === 'warn'){
      return 'rgb(163, 23, 23)'
    }
    if(value === 'info'){
      return 'blue'
    }
    if(value === 'question'){
      return 'gold'
    }
    return 'black';
  }

}
