import { Component, OnInit } from '@angular/core';
import { ItemListService } from 'src/app/services/item-list.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-options-list',
  templateUrl: './options-list.component.html',
  styleUrls: ['./options-list.component.scss']
})
export class OptionsListComponent implements OnInit {
  constructor(private itemListService: ItemListService, public popoverController: PopoverController) {}

  ngOnInit() {}

  delete = () => {
    this.popoverController.dismiss();
    this.itemListService.deleteItem(this.itemListService.object);
  };
}
