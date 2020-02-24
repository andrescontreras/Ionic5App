import { Component, OnInit, Output, EventEmitter, Input, TemplateRef } from '@angular/core';

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
  constructor() {}

  ngOnInit() {}

  onOpen = () => {
    this.open.emit(this.item);
  };
}
