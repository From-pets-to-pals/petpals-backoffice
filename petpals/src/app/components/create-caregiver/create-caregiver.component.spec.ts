import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateCaregiverComponent} from './create-caregiver.component';
import {provideMockStore} from "@ngrx/store/testing";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent} from "../../app.component";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {By} from "@angular/platform-browser";
import {MatOptionModule} from "@angular/material/core";
import {DebugElement} from "@angular/core";

describe('CreateCaregiverComponent', () => {
	let component: CreateCaregiverComponent;
	let fixture: ComponentFixture<CreateCaregiverComponent>;
	
	beforeEach(async () => {
		let initialState = {
			token: null
		}
		await TestBed.configureTestingModule({
				imports: [CreateCaregiverComponent, BrowserAnimationsModule, MatSelectModule, MatOptionModule],
				providers: [
					provideMockStore({initialState}),
				],
			})
			.compileComponents();
		fixture = TestBed.createComponent(CreateCaregiverComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should be created', () => {
		expect(component).toBeTruthy();
		
	});
	
	
	it('should have select options upon component creation', async () => {
		const caregivers = fixture.debugElement.query(By.css("#select_caregiver_type")).nativeElement;
		caregivers?.click();
		fixture.detectChanges();
		// @ts-ignore
		const inquiryOptions = fixture.debugElement.queryAll(By.css('.mdc-list-item__primary-text')) as HTMLElement[];
		expect(component.caregiverTypes.length == inquiryOptions.length).toBeTruthy();
		for(let i = 0; i < inquiryOptions.length;i++){
			// @ts-ignore
			expect(component.caregiverTypes[i].label).toEqual(inquiryOptions[i]?.nativeNode.textContent);
		}
		fixture.destroy();
		fixture = TestBed.createComponent(CreateCaregiverComponent);
		fixture.detectChanges();
		//hihi
		const days = fixture.debugElement.query(By.css("#select_working_days")).nativeElement;
		days?.click();
		fixture.detectChanges();
		// @ts-ignore
		const daysOptions = fixture.debugElement.queryAll(By.css('.mdc-list-item__primary-text')) as HTMLElement[];
		expect(component.days.length == daysOptions.length).toBeTruthy();
		for(let i = 0; i < daysOptions.length;i++) {
			// @ts-ignore
			expect(component.days[i].label).toEqual(daysOptions[i]?.nativeNode.textContent);
		}
		fixture.destroy();
		fixture = TestBed.createComponent(CreateCaregiverComponent);
		fixture.detectChanges();
		
		const palsHandled = fixture.debugElement.query(By.css("#select_pals_handled")).nativeElement;
		palsHandled?.click();
		fixture.detectChanges();
		// @ts-ignore
		const palsOptions = fixture.debugElement.queryAll(By.css('.mdc-list-item__primary-text')) as HTMLElement[];
		expect(component.palsHandled.length == palsOptions.length).toBeTruthy();
		for(let i = 0; i < palsOptions.length;i++) {
			// @ts-ignore
			expect(component.palsHandled[i].label).toEqual(palsOptions[i]?.nativeNode.textContent);
		}
		fixture.destroy();
		fixture = TestBed.createComponent(CreateCaregiverComponent);
		fixture.detectChanges();
		
		const homeService = fixture.debugElement.query(By.css("#select_home_service")).nativeElement;
		homeService?.click();
		fixture.detectChanges();
		// @ts-ignore
		const homeServiceOptions = fixture.debugElement.queryAll(By.css('.mdc-list-item__primary-text')) as HTMLElement[];
		expect(component.homeService.length == homeServiceOptions.length).toBeTruthy();
		for(let i = 0; i < homeServiceOptions.length;i++) {
			// @ts-ignore
			expect(component.homeService[i].label).toEqual(homeServiceOptions[i]?.nativeNode.textContent);
		}
	});
	
});