import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Field } from 'src/app/models/field';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() field: Field;
  @Output() fieldChange = new EventEmitter<Field>();

  constructor() {}

  ngOnInit() {}

  onInputChange = () => {
    this.fieldChange.emit();
  };
}
