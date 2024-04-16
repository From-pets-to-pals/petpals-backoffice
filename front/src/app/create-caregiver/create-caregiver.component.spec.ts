import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCaregiverComponent } from './create-caregiver.component';

describe('CreateCaregiverComponent', () => {
  let component: CreateCaregiverComponent;
  let fixture: ComponentFixture<CreateCaregiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCaregiverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCaregiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
