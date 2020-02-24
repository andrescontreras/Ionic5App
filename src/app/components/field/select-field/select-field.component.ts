import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Field, ObjectId } from 'src/app/models/field';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent implements OnInit, AfterContentChecked {
  @Input() field: Field;
  @Output() fieldChange = new EventEmitter<Field>();

  options: ObjectId[];
  selected: ObjectId;
  noSelected: ObjectId = new ObjectId(-1, 'select');
  constructor(private cdref: ChangeDetectorRef) {}

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnInit() {
    this.options = this.field.specificData.selectOptions;
    this.findSelected();
  }

  onInputChange = e => {
    this.field.value = e.detail.value;
    this.findSelected();
    this.fieldChange.emit();
  };

  findSelected = () => {
    if (this.field.value !== undefined && this.field.value !== null) {
      this.selected = this.options.find(o => o.id === this.field.value);
    } else {
      this.selected = this.noSelected;
    }
  };
}
