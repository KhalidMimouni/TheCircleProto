import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeysinputComponent } from './keysinput.component';

describe('KeysinputComponent', () => {
  let component: KeysinputComponent;
  let fixture: ComponentFixture<KeysinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeysinputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeysinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
