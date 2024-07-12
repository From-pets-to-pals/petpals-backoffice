import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOwnerComponent } from './auth-owner.component';

describe('AuthOwnerComponent', () => {
  let component: AuthOwnerComponent;
  let fixture: ComponentFixture<AuthOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
