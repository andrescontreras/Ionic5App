import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { Field } from 'src/app/models/field';
import { InputType } from 'src/app/enums/input-type.enum';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() field: Field;
  @Output() fieldChange = new EventEmitter<Field>();

  @ViewChild('text', { static: true }) text: TemplateRef<any>;
  @ViewChild('date', { static: true }) date: TemplateRef<any>;
  @ViewChild('select', { static: true }) select: TemplateRef<any>;

  get itemTemplateRef() {
    const tipoInputStr = InputType[this.field.inputmode];
    if (!tipoInputStr) {
      throw new Error(`tipoInputStr is "${tipoInputStr}".`);
    }
    const template = this[tipoInputStr];
    if (!template) {
      throw new Error(`template is "${tipoInputStr}" for tipoInput "${tipoInputStr}".`);
    }
    return template;
  }

  constructor() {}

  ngOnInit() {}

  onInputChange = () => {
    this.fieldChange.emit();
  };
}
