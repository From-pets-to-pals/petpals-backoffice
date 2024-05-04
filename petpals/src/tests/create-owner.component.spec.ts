import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOwnerComponent } from '../app/components/create-owner/create-owner.component';
import options from "../app/models/menus/select.options";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('CreateOwnerComponent', () => {
  let component: CreateOwnerComponent;
  let fixture: ComponentFixture<CreateOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOwnerComponent,BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set good options and update pal in pals list', () => {
    expect(component).toBeTruthy();
    for(let i = 0; i < options.passport.length; i++){
      expect(component.passportOptions[i].label).toEqual(options.passport[i].label)
      expect(component.passportOptions[i].value).toEqual(options.passport[i].value)
    }
    for(let i = 0; i < options.gender.length; i++){
      expect(component.sexOptions[i].label).toEqual(options.gender[i].label)
      expect(component.sexOptions[i].value).toEqual(options.gender[i].value)
    }
    for(let i = 0; i < options.palsHandled.length; i++){
      expect(component.speciesOptions[i].label).toEqual(options.palsHandled[i].label)
      expect(component.speciesOptions[i].value).toEqual(options.palsHandled[i].value)
    }
    expect(component.form.controls.pals.length).toEqual(1)
    component.AddPalToList()
    expect(component.form.controls.pals.length).toEqual(2)
    component.AddPalToList()
    expect(component.form.controls.pals.length).toEqual(3)
    component.RemoveLastPal()
    expect(component.form.controls.pals.length).toEqual(2)
    component.RemovePal(1)
    expect(component.form.controls.pals.length).toEqual(1)
  });
});
