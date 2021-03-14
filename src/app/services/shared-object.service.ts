import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedObjectService {

  constructor() { }

  protected menuCategories: string[] = [];

  updateMenuCategories(categories: string[]){
    this.menuCategories = categories;
  }
}
