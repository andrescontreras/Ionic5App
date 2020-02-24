import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @Input() items;
  @Input() itemTemplateRef: TemplateRef<any>;
  @Output() openItem = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  open = item => {
    this.openItem.emit(item);
  };
}
