import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesListToggleComponent } from './favorites-list-toggle.component';

describe('FavoritesListToggleComponent', () => {
  let component: FavoritesListToggleComponent;
  let fixture: ComponentFixture<FavoritesListToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesListToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesListToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
