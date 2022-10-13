import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCreateComponent } from './delivery-create.component';

describe('DeliveryCreateComponent', () => {
  let component: DeliveryCreateComponent;
  let fixture: ComponentFixture<DeliveryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
