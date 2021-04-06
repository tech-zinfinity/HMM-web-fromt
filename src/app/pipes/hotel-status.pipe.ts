import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hotelStatus'
})
export class HotelStatusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let s;
    if(value==='REQUESTED'){
      s='pending_actions';
    }
    if(value==='APPROVED'){
      s='done_all'
    }
    if(value==='VERIFIED'){
      s='verified';
    }
    if(value==='PUBLISHED'){
      s="published_with_changes";
    }
    if(value==='REJECTED'){
      s='thumb_down_alt';
    }
    return s;
  }

}
