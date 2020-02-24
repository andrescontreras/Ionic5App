import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FieldComponent } from './field/field.component';
import { FieldListComponent } from './field-list/field-list.component';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { DateFieldComponent } from './field/date-field/date-field.component';
import { SelectFieldComponent } from './field/select-field/select-field.component';
@NgModule({
  declarations: [
    FieldComponent,
    FieldListComponent,
    ItemComponent,
    ItemListComponent,
    DateFieldComponent,
    SelectFieldComponent
  ],
  exports: [
    FieldComponent,
    FieldListComponent,
    ItemComponent,
    ItemListComponent,
    DateFieldComponent,
    SelectFieldComponent
  ],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ComponentsModule {}
