import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Field } from 'src/app/models/field';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss']
})
export class DateFieldComponent implements OnInit {
  @Input() field: Field;
  @Output() fieldChange = new EventEmitter<Field>();
  constructor() {}

  ngOnInit() {}

  onInputChange = () => {
    this.fieldChange.emit();
  };
}
