import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedDetailsCardComponent } from './breed-details-card.component';

describe('BreedDetailsCardComponent', () => {
  let component: BreedDetailsCardComponent;
  let fixture: ComponentFixture<BreedDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreedDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
