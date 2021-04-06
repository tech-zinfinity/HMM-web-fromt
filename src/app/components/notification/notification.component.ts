import { Notification } from './../../entities/notification';
import { AuthService } from './../../services/auth.service';
import { SharedObjectService } from 'src/app/services/shared-object.service';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService: NotificationService,
    private share: SharedObjectService,
    private auth: AuthService) { }

  notifications: Notification[] = [];

  ngOnInit(): void {
    this.notificationService.getForUser(this.auth.getUser().id).subscribe((d:Notification[] )=>{
      this.notifications = d;
    }, err=>{

    });
  }

}
