import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOwnerComponent } from './create-owner.component';
import options from "../../models/menus/select.options";
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
  it('should set good options', () => {
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
    expect(component.pals.length).toEqual(1)
    component.AddPalToList()
    expect(component.pals.length).toEqual(2)
    component.RemovePal(1)
    expect(component.pals.length).toEqual(1)
    component.updatePalIdentityInformation({target:{value: "Ashe"}}, 0, "name")
    expect(component.pals[0].palIdentityInformation.name).toEqual("Ashe")

  });
});
