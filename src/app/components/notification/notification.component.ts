import { Spinner } from './../../services/progress-service.service';
import { Notification } from './../../entities/notification';
import { AuthService } from './../../services/auth.service';
import { SharedObjectService } from 'src/app/services/shared-object.service';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService: NotificationService,
    private share: SharedObjectService,
    private auth: AuthService,
    public spinner:Spinner) { }

  notifications: Notification[] = [];
  notes: DateNotificationMapping[] = [];
  today = new Date();

  ngOnInit(): void {
    let spin = this.spinner.open();
    this.notificationService.getForUser(this.auth.getUser().id).subscribe((d:Notification[] )=>{
      this.notifications = d;
      let dates: string[] = this.notifications.map(d => d.createdOn).map(e=>
        new Date(e).getDate()+'-'+new Date(e).getMonth()+'-'+new Date(e).getFullYear());
      dates = _.uniq(dates);
      dates.forEach(dat =>{   
        let n: DateNotificationMapping = {
          date: dat,
          notifications: this.notifications.filter(e => (new Date(e.createdOn).getDate()+'-'+new Date(e.createdOn).getMonth()+'-'+new Date(e.createdOn).getFullYear()) === dat)
        }
        this.notes.push(n);
      });      
      spin.close();
    }, err=>{
      spin.close();
    });
  }

}

export interface DateNotificationMapping{
  date?: Date | any;
  notifications?: Notification[];
}
