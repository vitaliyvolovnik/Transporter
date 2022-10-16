import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportersComponent } from './transporters.component';

describe('TransportersComponent', () => {
  let component: TransportersComponent;
  let fixture: ComponentFixture<TransportersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
