import { Component, OnInit, Output, EventEmitter, Input, TemplateRef } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { OptionsListComponent } from '../options-list/options-list.component';
import { ItemListService } from 'src/app/services/item-list.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item;
  @Input() itemTemplateRef: TemplateRef<any>;
  @Output() open = new EventEmitter();
  @Output() deleteItem = new EventEmitter();
  constructor(public popoverController: PopoverController, private itemListService: ItemListService) {}

  ngOnInit() {
    this.itemListService.deleteItem = this.delete;
  }

  onOpen = () => {
    this.open.emit(this.item);
  };

  async presentPopover(ev: any) {
    this.itemListService.object = this.item;
    const popover = await this.popoverController.create({
      component: OptionsListComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  delete = item => {
    this.deleteItem.emit(item);
  };
}
