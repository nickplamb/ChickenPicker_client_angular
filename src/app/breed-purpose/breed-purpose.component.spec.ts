import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedPurposeComponent } from './breed-purpose.component';

describe('BreedPurposeComponent', () => {
  let component: BreedPurposeComponent;
  let fixture: ComponentFixture<BreedPurposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreedPurposeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
