import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingDishComponent } from './adding-dish.component';

describe('AddingDishComponent', () => {
  let component: AddingDishComponent;
  let fixture: ComponentFixture<AddingDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingDishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
