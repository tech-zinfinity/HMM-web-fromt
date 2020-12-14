import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-vendor-main',
  templateUrl: './vendor-main.component.html',
  styleUrls: ['./vendor-main.component.scss']
})
export class VendorMainComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
