import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FieldListComponent } from './field-list.component';

describe('FieldListComponent', () => {
  let component: FieldListComponent;
  let fixture: ComponentFixture<FieldListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FieldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
