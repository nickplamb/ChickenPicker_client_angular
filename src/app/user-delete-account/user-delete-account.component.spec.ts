import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteAccountComponent } from './user-delete-account.component';

describe('UserDeleteAccountComponent', () => {
  let component: UserDeleteAccountComponent;
  let fixture: ComponentFixture<UserDeleteAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDeleteAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
