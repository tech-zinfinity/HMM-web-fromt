import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDividerModule } from "@angular/material/divider";
import { MatRadioModule } from "@angular/material/radio";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import {MatNativeDateModule} from '@angular/material';
// import { MatMomentDateModule } from "@angular/material-moment-adapter"
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,MatDividerModule,MatCheckboxModule,
    MatCardModule,MatBadgeModule,MatTabsModule,MatProgressSpinnerModule,
    MatToolbarModule,MatBottomSheetModule,MatStepperModule,MatDatepickerModule,
    MatFormFieldModule,MatRadioModule,MatMenuModule, 
    MatInputModule,MatChipsModule,MatDialogModule, MatSnackBarModule,
    MatTableModule,MatProgressBarModule,
    MatPaginatorModule,MatSelectModule,MatSlideToggleModule,
    MatRippleModule, MatIconModule,MatGridListModule, 
    MatSidenavModule,MatListModule,MatTooltipModule,MatTreeModule,MatExpansionModule
  ],
  exports:[
    MatButtonModule,
    MatCardModule,MatBadgeModule,
    MatToolbarModule,MatBottomSheetModule,MatSlideToggleModule,
    MatFormFieldModule,MatChipsModule,MatProgressSpinnerModule,MatCheckboxModule,
    MatInputModule,MatProgressBarModule,MatTabsModule,MatDividerModule,
    MatTableModule,MatSelectModule,MatStepperModule,MatDatepickerModule,
    MatPaginatorModule,MatRippleModule, MatIconModule, MatMenuModule, MatDialogModule, MatTreeModule,
    MatSnackBarModule,MatGridListModule, MatRadioModule,MatSidenavModule,MatListModule,MatTooltipModule,MatExpansionModule
  ]
}
)
export class MaterialModule {}
