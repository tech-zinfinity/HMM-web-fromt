import { KeyValue } from './../common/model/key-value';
import { DynamicFormService } from './../common/dynamic-form.service';
import { ConfirmationService } from './../common/confirmation.service';
import { Spinner } from './../../services/progress-service.service';
import { Table } from './../../entities/table';
import { MenuService } from './../../services/menu.service';
import { GenericResponse } from './../../entities/generic-response';
import { TableService } from './../../services/table.service';
import { FormHelperService } from './../../services/form-helper-service.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
import * as _ from "lodash";
import { DynamicFormControlType } from '../common/constants/form-control-type.enum';

@Component({
  selector: 'app-vendor-view-menu',
  templateUrl: './vendor-view-menu.component.html',
  styleUrls: ['./vendor-view-menu.component.scss']
})
export class VendorViewMenuComponent implements OnInit {

  hotel: Hotel;
  menus: Menu[] = [];
  filteredMenus: Menu[] = [];
  originalMenus: Menu[] = [];
  menuForm: FormGroup;
  tableForm: FormGroup;
  availableCategories: string[] = [];
  selectedCategories: string[] = [];
  categoryFilterForm =  new FormControl(null);
  // primarycolor="warn";

  constructor(public hotelService: HotelService,
    private storage: FireStorageService,
    private ops: HotelOperationsService,
    public share: SharedObjectService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    public fhelper: FormHelperService,
    private tableService: TableService,
    private menuService:MenuService,
    private spinner: Spinner,
    private confirm: ConfirmationService,
    private dForm: DynamicFormService) {
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
        this.filteredMenus = this.menus;
        this.originalMenus = this.menus;
        this.availableCategories =_.uniq(this.menus.map(s=>s.category));
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

  getMenuImage(pic: string, id: string): Observable<string>{
    return this.storage.getPics('HOTELS/'+id+'/MENU/'+pic);
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

  addImageInMenu(event, menu: Menu){
    let spin = this.spinner.open();
    let file = event.target.files[0];
    this.storage.uploadToStoragePNG(file,'HOTELS/'+this.hotel.id+'/MENU/', 
        JSON.stringify(menu.picsUrls.length+1)).then(d=>{
        menu.picsUrls.push(d.metadata.name);
        this.menuService.updateMenu(this.hotel.id, menu).subscribe((hotel: GenericResponse<Hotel>) =>{
          if(hotel.code === 'OK'){
            this.hotelService.updateHotel(hotel.body);
          }else{
            this.snackbar.open(hotel.message, 'close', {duration: 2000});
          }
          spin.close();
        }, err=>{
          console.log(err);
          spin.close();
        })
    });
  }

  addMenu(menu: Menu){
    let spin = this.spinner.open()
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
          spin.close();
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
          spin.close();
          console.log(err);
          this.snackbar.open("System Failure", 'close', {duration:2000});
        })
      })
    }else{
      this.menuService.addMenubyCategory(this.hotel.id, menu)
      .subscribe((d:GenericResponse<Hotel>)=>{
        spin.close();
        if(d.code === 'OK'){
          this.snackbar.open(d.message, 'close', {duration:2000});
          this.hotelService.updateHotel(d.body);
          this.menus = d.body.menus;
        }else{
          this.snackbar.open(d.message, 'close', {duration:2000});
        }
      }, err=>{
        spin.close();
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

  downloadTableQR(table:Table){
    this.storage.getPics('HOTELS/'+this.hotel.id+'/TABLE'+'/'+table.qrLink).subscribe(e =>{
      e;
    },err=>{
      console.log(err);
    })
  }

  changeAvailabilityOfMenu(menu: Menu){
    menu.available = !menu.available;
    
  }

  changeVegStatusOgMenu(menu: Menu){

  }
  
  removePicFromMenu(image: string, menu: Menu){
    let conf = this.confirm.open('warn', 'Do you want to remove image ?');
    conf.afterClosed().subscribe(d =>{
      if(d){
        let spin  = this.spinner.open();
        let i  = image.substring(image.indexOf('MENU'), image.indexOf('.png')).substring(7).concat('.png');
        this.storage.deletePic('HOTELS/'+this.hotel.id+'/MENU/'+i).subscribe(d =>{
            menu.picsUrls.splice(menu.picsUrls.indexOf(i), 1);
            menu.temppicsUrls.splice(menu.temppicsUrls.indexOf(image), 1);
            this.menuService.updateMenu(this.hotel.id, menu).subscribe((data: GenericResponse<Hotel>) =>{
              spin.close()
              if(data.code === 'OK'){
                this.hotelService.updateHotel(data.body);
              }else{
                this.snackbar.open(data.message, 'close', {duration: 2000});
              }
            }, err=>{
              spin.close();
            });
        }, err=>{
          spin.close();
        });
    
      }
    });
  }

  resetMenusFilters(){
    this.categoryFilterForm.reset();
    this.originalMenus = this.menus;
    this.filteredMenus = this.menus;
  }

  filterMenus(filter: string){    
    if(filter != null){
      if(filter != ''){
        if(filter.length >0){
          this.filteredMenus = this.filteredMenus.filter(d =>
            d.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
        }else{
          this.filteredMenus = this.originalMenus;
        }
      }else{
        this.filteredMenus = this.originalMenus;
      }
    }else{
      this.filteredMenus = this.originalMenus;
    }
  }

  filterMenusByCategory(categories: string[]){    
    if(categories){
      if(categories.length>0){
        categories.forEach(cat =>{
          this.filteredMenus = this.menus.filter(d => d.category === cat);
          this.originalMenus = this.menus.filter(d => d.category === cat);
        })
      }else{
        this.filteredMenus = this.menus;
      }
    }else{
      this.filteredMenus = this.menus;
    }
  }

  changeCategoryForMenu(menu: Menu){    
    let ref = this.dForm.open([{
      fieldName:'Category',
      entityField:'category',
      value:menu.category,
      options: this.share.menuCategories,
      required:true,
      type: DynamicFormControlType.select,
      placeHolder: 'Please select category'
    }]);

    ref.afterClosed().subscribe((d: KeyValue[])=>{
      let spin = this.spinner.open('Updating Menu');
      if(d){
        _.forEach(d, e=>{
          menu.category = e.value;
          this.menuService.updateMenu(this.hotel.id,menu).subscribe((m: GenericResponse<Hotel>) =>{
            spin.close();
            if(m.code === 'OK'){
              this.hotelService.updateHotel(m.body);
              this.snackbar.open(m.message, 'close', {duration:2000});
            }else{
              this.snackbar.open(m.message, 'close', {duration:2000});
            }
          },err=>{
            spin.close();
          });
        });
      }else{
        spin.close();
      }
    });
  }

  changeTitleForMenu(menu: Menu){    
    let ref = this.dForm.open([{
      fieldName:'Title',
      entityField:'title',
      value:menu.title,
      required:true,
      type: DynamicFormControlType.text,
      placeHolder: 'Please select title'
    }]);

    ref.afterClosed().subscribe((d: KeyValue[])=>{
      let spin = this.spinner.open('Updating Menu');
      if(d){
        _.forEach(d, e=>{
          menu.title = e.value;
          this.menuService.updateMenu(this.hotel.id,menu).subscribe((m: GenericResponse<Hotel>) =>{
            spin.close();
            if(m.code === 'OK'){
              this.hotelService.updateHotel(m.body);
              this.snackbar.open(m.message, 'close', {duration:2000});
            }else{
              this.snackbar.open(m.message, 'close', {duration:2000});
            }
          },err=>{
            spin.close();
          });
        });
      }else{
        spin.close();
      }
    });
  }

  changeDescriptionForMenu(menu: Menu){    
    let ref = this.dForm.open([{
      fieldName:'Description',
      entityField:'description',
      value:menu.description,
      required:true,
      type: DynamicFormControlType.text,
      placeHolder: 'Please select description'
    }]);

    ref.afterClosed().subscribe((d: KeyValue[])=>{
      let spin = this.spinner.open('Updating Menu');
      if(d){
        _.forEach(d, e=>{
          menu.description = e.value;
          this.menuService.updateMenu(this.hotel.id,menu).subscribe((m: GenericResponse<Hotel>) =>{
            spin.close();
            if(m.code === 'OK'){
              this.hotelService.updateHotel(m.body);
              this.snackbar.open(m.message, 'close', {duration:2000});
            }else{
              this.snackbar.open(m.message, 'close', {duration:2000});
            }
          },err=>{
            spin.close();
          });
        });
      }else{
        spin.close();
      }
    });
  }

  changePriceForMenu(menu: Menu){    
    let ref = this.dForm.open([{
      fieldName:'Price',
      entityField:'price',
      value:menu.cost,
      required:true,
      type: DynamicFormControlType.text,
      placeHolder: 'Please select cost'
    }]);

    ref.afterClosed().subscribe((d: KeyValue[])=>{
      let spin = this.spinner.open('Updating Menu');
      if(d){
        _.forEach(d, e=>{
          menu.cost = e.value;
          this.menuService.updateMenu(this.hotel.id,menu).subscribe((m: GenericResponse<Hotel>) =>{
            spin.close();
            if(m.code === 'OK'){
              this.hotelService.updateHotel(m.body);
              this.snackbar.open(m.message, 'close', {duration:2000});
            }else{
              this.snackbar.open(m.message, 'close', {duration:2000});
            }
          },err=>{
            spin.close();
          });
        });
      }else{
        spin.close();
      }
    });
  }

}

