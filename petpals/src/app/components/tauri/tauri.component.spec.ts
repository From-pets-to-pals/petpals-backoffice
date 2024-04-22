import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TauriComponent } from './tauri.component';

describe('TauriComponent', () => {
  let component: TauriComponent;
  let fixture: ComponentFixture<TauriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TauriComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TauriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should open dialog', () => {
    spyOn(component,"openDialog").and.callThrough();
    component.greet("Sid");
    expect(component.openDialog).toHaveBeenCalled();
  });
});
