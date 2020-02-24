import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Field } from 'src/app/models/field';

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.scss']
})
export class FieldListComponent implements OnInit, OnChanges {
  @Input() fields: Field[];
  @Input() object: any;
  @Input() change: number; // usado como trigger para actualizar los valores de los campos con respecto a los valores del objeto
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if (changes.change && changes.change.currentValue !== 0 && changes.change.currentValue !== undefined) {
      this.updateFields();
    }
  }

  updateFields = () => {
    this.fields.forEach(field => {
      field.value = this.object[field.atribute];
    });
  };

  fieldChange = () => {
    this.fields.forEach(field => {
      this.object[field.atribute] = field.value;
    });
  };
}
