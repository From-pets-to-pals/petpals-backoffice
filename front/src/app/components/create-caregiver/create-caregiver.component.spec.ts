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
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should be ready to ad caregiver', async () => {
		expect(component.isRegistered).toBeFalse();
		const caregivers = fixture.debugElement.query(By.css("#select_caregiver_type")).nativeElement;
		caregivers?.click();
		fixture.detectChanges();
		// @ts-ignore
		const inquiryOptions = fixture.debugElement.queryAll(By.css('.mdc-list-item__primary-text')) as HTMLElement[];
		console.debug(inquiryOptions[0])
		// @ts-ignore
		expect(inquiryOptions[0]?.nativeNode.textContent).toEqual("Groomer");
		// @ts-ignore
		expect(inquiryOptions[1]?.nativeNode.textContent).toEqual("Éducateur");
		// @ts-ignore
		expect(inquiryOptions[2]?.nativeNode.textContent).toEqual("Vétérinaire");
		fixture.destroy();
		fixture = TestBed.createComponent(CreateCaregiverComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		const days = fixture.debugElement.query(By.css("#select_working_days")).nativeElement;
		days?.click();
		fixture.detectChanges();
		// @ts-ignore
		const options = fixture.debugElement.queryAll(By.css('.mdc-list-item__primary-text')) as HTMLElement[];
		console.debug(options[0])
		// @ts-ignore
		expect(options[0]?.nativeNode.textContent).toEqual("Lundi");
		// @ts-ignore
		expect(options[1]?.nativeNode.textContent).toEqual("Mardi");
		// @ts-ignore
		expect(options[2]?.nativeNode.textContent).toEqual("Mercredi");
	});
	
});
