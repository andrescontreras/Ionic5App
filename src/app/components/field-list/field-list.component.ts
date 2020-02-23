import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Field } from 'src/app/models/field';

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.scss']
})
export class FieldListComponent implements OnInit, OnChanges {
  @Input() fields: Field[];
  @Input() object: any;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log(changes);
  }

  fieldChange = () => {
    this.fields.forEach(field => {
      this.object[field.atribute] = field.value;
    });
  };
}
