import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApaClassComponent } from './apa-class.component';

describe('ApaClassComponent', () => {
  let component: ApaClassComponent;
  let fixture: ComponentFixture<ApaClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApaClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApaClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
