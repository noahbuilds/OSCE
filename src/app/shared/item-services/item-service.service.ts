import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ItemServiceService {
  items: any[] = [];
  passages: any[] = [];

  constructor() {
    this.getItems(); //.subscribe(item => this.items = item);
  }

  getItems() {
    return this.items;
  }

  getPassages(){
    return this.passages;
  }

  getPassage(id: string) {
    let passage = this.items.filter((item) => {
      return (item.passageId = id);
    });
    return passage;
  }

  addItem(data: any) {
    this.items.push(data);
  }

  addPassage(data:any){
    this.passages.push(data);
  }
}

export interface items {
  reference: string;
  stimulus: string;
  tags: string[];
  itemType: string;
}
