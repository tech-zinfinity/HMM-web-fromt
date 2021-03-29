import { MenuService } from './../../services/menu.service';
import { GenericResponse } from './../../entities/generic-response';
import { TableService } from './../../services/table.service';
import { FormHelperService } from './../../services/form-helper-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menu } from './../../entities/menu';
import { HotelOperationsService } from './../../services/hotel-operations.service';
import { FireStorageService } from './../../services/fire-storage-service.service';
import { Hotel } from './../../entities/hotel';
import { HotelService } from './../../services/hotel.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedObjectService } from 'src/app/services/shared-object.service';
import * as uuid from 'uuid';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-vendor-view-menu',
  templateUrl: './vendor-view-menu.component.html',
  styleUrls: ['./vendor-view-menu.component.scss']
})
export class VendorViewMenuComponent implements OnInit {

  hotel: Hotel;
  menus: Menu[] = [];
  menuForm: FormGroup;
  tableForm: FormGroup;

  constructor(private hotelService: HotelService,
    private storage: FireStorageService,
    private ops: HotelOperationsService,
    public share: SharedObjectService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    public fhelper: FormHelperService,
    private tableService: TableService,
    private menuService:MenuService) {
      this.menuForm = fb.group({
        'title':[null, Validators.required],
        'description':[null, Validators.required],
        'cost':[null, Validators.required],
        'veg':[false, Validators.required],
        'available':[false],
        'category':[null, Validators.required]
      });
      this.tableForm = fb.group({
        'tableNo':[null, Validators.required]
      })
    }

  ngOnInit(): void {
    this.hotelService.currentHotel.subscribe((d: Hotel) =>{
      this.hotel = d;        
      if(this.hotel) 
      if(this.hotel.tables)
      this.hotel.tables.forEach(table =>{
        this.storage.getPics('HOTELS/'+this.hotel.id+'/TABLE'+'/'+table.qrLink).subscribe(e =>{
          table.link = e;
        },err=>{
          console.log(err);
        })
      }) 
      if(this.hotel)
      this.ops.getMenusByHotelId(d.id).subscribe((menus: Menu[]) =>{
        if(menus)        
        this.menus = menus;
        this.menus.forEach(m =>{
          if(m.picsUrls)
          if(m.picsUrls.length>0){
            m.temppicsUrls=[];
            m.picsUrls.forEach(u =>{
              this.storage.getPics('HOTELS/'+this.hotel.id+'/MENU/'+u).subscribe(t =>{
                m.temppicsUrls.push(t);                
              }, err=>{
  
              })
            })
          }
        })
      }, err=>{
        this.snackbar.open('Menus not available', 'close', {duration: 2000})
      })    

    })

  }

  removeImageFromArray(content: any){    
    this.files.splice(this.files.indexOf(this.files.filter(d=>d.key === content)[0]), 1);
  }

  resetMenuForm(){
    this.menuForm.reset();
    this.menuForm.markAsUntouched();
    this.menuForm.markAsPristine();
    this.menuForm.updateValueAndValidity();
  }

  resetTableForm(){
    this.tableForm.reset();
    this.tableForm.markAsUntouched();
    this.tableForm.markAsPristine();
    this.tableForm.updateValueAndValidity();
  }

  addTable(value:any){
    let tableNo=value.tableNo;
    let uid = uuid.v1();
    uid = this.hotel.id+'-'+uid;
    this.tableService.registerTable(this.hotel.id, tableNo,uid).subscribe((d: File) =>{
        this.storage.uploadToStoragePNG(d,'HOTELS/'+this.hotel.id+'/TABLE', uid+'-'+tableNo)
        .then(          
          object =>{
            this.tableService.registerTableQR(this.hotel.id, tableNo, object.metadata.name, uid).subscribe((d:any)=>{
              this.resetTableForm();
              this.hotelService.updateHotel(this.hotel);
              this.hotel.tables = d.body.tables;
              this.hotel.tables.forEach(table =>{
                this.storage.getPics('HOTELS/'+this.hotel.id+'/TABLE'+'/'+table.qrLink).subscribe(e =>{
                  table.link = e;
                },err=>{
                  console.log(err);
                })
              }) 
            }, err=>{
              console.log(err);
            })
          }, 
          error=>{
            console.log(error);
          }
        );
    }, err=>{
      console.log(err);
    });
  }

  selectedfile: File | any = null;
  files: KeyValue[] = [];
  selectedFiles: File[] = [];
  @ViewChild('file') file: ElementRef;

  addFile(event) {
    let body: KeyValue = {};
    body.value = event.target.files[0];

    var reader = new FileReader();
    reader.onload = (event: any) => {
      body.key = event.target.result;
    }
    this.files.push(body);
    reader.readAsDataURL(event.target.files[0]);
    this.file.nativeElement.value = '';
  }

  addMenu(menu: Menu){
    let count = 0;
    if(this.files.length>0){
      let obss:any[] =[];
      this.files.forEach(d=>{
        obss.push(this.storage.uploadToStoragePNG(d.value,'HOTELS/'+this.hotel.id+'/MENU/', 
        JSON.stringify(count+1)))
      });
      menu.picsUrls = [];
      forkJoin(obss).subscribe((results: any[])=>{
        results.forEach(r =>{
          menu.picsUrls.push(r.metadata.name)          
        });
        this.menuService.addMenubyCategory(this.hotel.id, menu)
        .subscribe((d:GenericResponse<Hotel>)=>{
          if(d.code === 'OK'){
            this.snackbar.open(d.message, 'close', {duration:2000});
            this.hotelService.updateHotel(d.body);
            this.menus = d.body.menus;
            this.menus.forEach(m =>{
              m.temppicsUrls=[];
              if(m.picsUrls){
                if(m.picsUrls.length>0){
                  m.picsUrls.forEach(u =>{
                    this.storage.getPics('HOTELS/'+this.hotel.id+'/MENU/'+u).subscribe(t =>{
                      m.temppicsUrls.push(u);
                    }, err=>{
    
                    })
                  })
                }
              }
            })
            this.resetMenuForm();
            this.files = [];
          }else{
            this.snackbar.open(d.message, 'close', {duration:2000});
          }
        }, err=>{
          console.log(err);
          this.snackbar.open("System Failure", 'close', {duration:2000});
        })
      })
    }else{
      this.menuService.addMenubyCategory(this.hotel.id, menu)
      .subscribe((d:GenericResponse<Hotel>)=>{
        if(d.code === 'OK'){
          this.snackbar.open(d.message, 'close', {duration:2000});
          this.hotelService.updateHotel(d.body);
          this.menus = d.body.menus;
        }else{
          this.snackbar.open(d.message, 'close', {duration:2000});
        }
      }, err=>{
        console.log(err);
        this.snackbar.open("System Failure", 'close', {duration:2000});
      })
    }
  }

  deleteMenu(id: string){
    this.hotelService.deleteMenu(id, this.hotel.id).subscribe((d: GenericResponse<Hotel>)=>{
      if(d.code === 'OK'){
        this.hotelService.updateHotel(d.body);
        this.menus = d.body.menus;
        this.snackbar.open('Menu deleted successfully', 'close', {duration: 2000});
      }else{
        this.snackbar.open(d.message, 'close', {duration: 2000});
      }
    }, err=>{
      console.log(err);
      this.snackbar.open('System Failure', 'close', {duration: 2000});
    })
  }

  updateMenu(){

  }

  deleteTable(tableId: string){
    this.tableService.deleteTable(tableId, this.hotel.id).subscribe((data: GenericResponse<Hotel>)=>{
      if(data.code === 'OK'){
        this.snackbar.open("table deleted successfully",'close', {duration: 2000});
        this.hotel.tables = data.body.tables;
        this.hotel.tables.forEach(table =>{
          this.storage.getPics('HOTELS/'+this.hotel.id+'/TABLE'+'/'+table.qrLink).subscribe(e =>{
            table.link = e;
          },err=>{
            console.log(err);
          })
        }) 
      }
    }, err=>{

    });
  }

}

interface KeyValue{
  key?: any,
  value?: any
}
