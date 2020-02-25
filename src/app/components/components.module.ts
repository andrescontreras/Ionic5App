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
import { OptionsListComponent } from './options-list/options-list.component';
@NgModule({
  declarations: [
    FieldComponent,
    FieldListComponent,
    ItemComponent,
    ItemListComponent,
    DateFieldComponent,
    SelectFieldComponent,
    OptionsListComponent
  ],
  exports: [
    FieldComponent,
    FieldListComponent,
    ItemComponent,
    ItemListComponent,
    DateFieldComponent,
    SelectFieldComponent,
    OptionsListComponent
  ],
  imports: [CommonModule, FormsModule, IonicModule],
  entryComponents: [OptionsListComponent]
})
export class ComponentsModule {}
