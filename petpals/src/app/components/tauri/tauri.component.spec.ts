import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TauriComponent } from './tauri.component';
import {Browser} from "puppeteer";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('TauriComponent', () => {
  let component: TauriComponent;
  let fixture: ComponentFixture<TauriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TauriComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TauriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.input.value).toEqual("");

  });
  
  it('should open dialog', () => {
    spyOn(component,"openDialog").and.callThrough();
    component.greet();
    expect(component.openDialog).toHaveBeenCalled();
  });
});
