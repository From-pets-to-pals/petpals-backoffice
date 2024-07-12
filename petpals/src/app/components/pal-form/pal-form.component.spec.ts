import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalFormComponent } from './pal-form.component';

describe('PalFormComponent', () => {
  let component: PalFormComponent;
  let fixture: ComponentFixture<PalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
