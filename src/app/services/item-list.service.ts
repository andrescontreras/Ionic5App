import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {
  object: object;
  deleteItem = (item: any) => null;
  constructor() {}
}
