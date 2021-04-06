import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationModes'
})
export class NotificationModesPipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): string[] {
    let s: string[] = [];
      if(value.includes('MESSAGE')){
        s.push("Text Message")
      }
    return s;
  }

}
