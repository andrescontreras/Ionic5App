import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FieldComponent } from './field/field.component';
import { FieldListComponent } from './field-list/field-list.component';
@NgModule({
  declarations: [FieldComponent, FieldListComponent],
  exports: [FieldComponent, FieldListComponent],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ComponentsModule {}
