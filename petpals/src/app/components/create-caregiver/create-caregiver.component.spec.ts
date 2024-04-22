import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CreateCaregiverComponent} from './create-caregiver.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {By} from "@angular/platform-browser";
import {MatOptionModule} from "@angular/material/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

describe('CreateCaregiverComponent', () => {
	let component: CreateCaregiverComponent;
	let fixture: ComponentFixture<CreateCaregiverComponent>;
	let store : MockStore;
	let initialState = {
		token: null
	}
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
				imports: [CreateCaregiverComponent, BrowserAnimationsModule, MatSelectModule, MatOptionModule],
				providers: [
					provideMockStore({initialState}),
				],
			})
			.compileComponents();
		store = TestBed.inject(MockStore);
		fixture = TestBed.createComponent(CreateCaregiverComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should be created', () => {
		expect(component).toBeTruthy();
	});
	
	it('should open snackbar when unregistered', () => {
		component.isRegistered = false;
		spyOn(component,"openSnackBar").and.callThrough();
		component.createCaregiver();
		expect(component.openSnackBar).toHaveBeenCalled()
	});
	
	it('should get snackbar message from back on ngInit', () => {
		// @ts-ignore
		spyOn(component.getCareGiverApiService(),"get").and.resolveTo(Promise.resolve({data:"Hello from back"}));
		component.getFromBack();
		expect(component.getCareGiverApiService().get).toHaveBeenCalled()
	});
	
	
	it('should create caregiver', async () => {
		let form = new FormGroup({
				firstName: new FormControl('Sidou', {
					validators: [Validators.required, Validators.minLength(3)],
					nonNullable: true
				}),
				lastName: new FormControl('Bennaceur', {
					validators: [Validators.required, Validators.minLength(3)],
					nonNullable: true
				}),
				address: new FormControl('101, rue des Atrebates', {
					validators: [Validators.required, Validators.minLength(3)],
					nonNullable: true
				}),
				city: new FormControl('Arras', {
					validators: [Validators.required, Validators.minLength(3)],
					nonNullable: true
				}),
				zipCode: new FormControl('62000', {
					validators: [Validators.required, Validators.minLength(5)],
					nonNullable: true
				}),
				country: new FormControl('FRANCE', {validators: [Validators.required], nonNullable: true}),
				email: new FormControl('sa.bennaceur@gmail.com', {
					validators: [Validators.required, Validators.email],
					nonNullable: true
				}),
				phoneNumber: new FormControl('0764017528', {
					validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
					nonNullable: true
				}),
				caregiverType: new FormControl('GROOMER', {
					validators: [Validators.required, Validators.pattern("^(GROOMER|VET|TRAINER$)")],
					nonNullable: true
				}),
				homeService: new FormControl(false, {validators: [Validators.required], nonNullable: true}),
				isSubscribed: new FormControl(false, {validators: [Validators.required], nonNullable: true}),
				workingDays: new FormControl(["MONDAY"], component.minLengthArray(1)),
				palsHandled: new FormControl(["DOG"], {
					validators: [Validators.required, component.minLengthArray(1)],
					nonNullable: true
				}),
				priceRating: new FormControl(3.2, {validators: [Validators.required], nonNullable: true}),
				serviceRating: new FormControl(4.1, {validators: [Validators.required], nonNullable: true}),
				appointmentDuration: new FormControl(0.25, {validators: [Validators.required], nonNullable: true}),
			}
		)
		spyOn(component, "createCaregiver").and.callThrough();
		spyOn(component, "mapCaregiver").and.callThrough();
		
		// @ts-ignore
		component.form = form;
		const callWith = component.mapCaregiver();
		await spyOn(component.getCareGiverApiService(), "createCaregiver").and.resolveTo(Promise.resolve({data:"123456789"}));
		
		const createCaregiverButton = fixture.debugElement.query(By.css(".button_create_caregiver")).nativeElement;
		createCaregiverButton?.click();
		fixture.detectChanges();
		// @ts-ignore
		expect(component.getCareGiverApiService().createCaregiver).toHaveBeenCalledWith(callWith);
		expect(component.createCaregiver).toHaveBeenCalled();
		expect(component.mapCaregiver).toHaveBeenCalled();
		
		
		
	});
	
	it('should fail when creating caregiver', async () => {
		let form = new FormGroup({
				firstName: new FormControl('Sidou', {
					validators: [Validators.required, Validators.minLength(3)],
					nonNullable: true
				}),
				lastName: new FormControl('Bennaceur', {
					validators: [Validators.required, Validators.minLength(3)],
					nonNullable: true
				}),
				address: new FormControl('101, rue des Atrebates', {
					validators: [Validators.required, Validators.minLength(3)],
					nonNullable: true
				}),
				city: new FormControl('Arras', {
					validators: [Validators.required, Validators.minLength(3)],
					nonNullable: true
				}),
				zipCode: new FormControl('62000', {
					validators: [Validators.required, Validators.minLength(5)],
					nonNullable: true
				}),
				country: new FormControl('FRANCE', {validators: [Validators.required], nonNullable: true}),
				email: new FormControl('sa.bennaceur@gmail.com', {
					validators: [Validators.required, Validators.email],
					nonNullable: true
				}),
				phoneNumber: new FormControl('0764017528', {
					validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
					nonNullable: true
				}),
				caregiverType: new FormControl('GROOMER', {
					validators: [Validators.required, Validators.pattern("^(GROOMER|VET|TRAINER$)")],
					nonNullable: true
				}),
				homeService: new FormControl(false, {validators: [Validators.required], nonNullable: true}),
				isSubscribed: new FormControl(false, {validators: [Validators.required], nonNullable: true}),
				workingDays: new FormControl(["MONDAY"], component.minLengthArray(1)),
				palsHandled: new FormControl(["DOG"], {
					validators: [Validators.required, component.minLengthArray(1)],
					nonNullable: true
				}),
				priceRating: new FormControl(3.2, {validators: [Validators.required], nonNullable: true}),
				serviceRating: new FormControl(4.1, {validators: [Validators.required], nonNullable: true}),
				appointmentDuration: new FormControl(0.25, {validators: [Validators.required], nonNullable: true}),
			}
		)
		spyOn(component, "createCaregiver").and.callThrough();
		spyOn(component, "mapCaregiver").and.callThrough();
		
		// @ts-ignore
		component.form = form;
		const callWith = component.mapCaregiver();
		await spyOn(component.getCareGiverApiService(), "createCaregiver").and.resolveTo(Promise.reject({message:"123456789"}));
		
		const createCaregiverButton = fixture.debugElement.query(By.css(".button_create_caregiver")).nativeElement;
		createCaregiverButton?.click();
		fixture.detectChanges();
		// @ts-ignore
		expect(component.getCareGiverApiService().createCaregiver).toHaveBeenCalledWith(callWith);
		expect(component.createCaregiver).toHaveBeenCalled();
		expect(component.mapCaregiver).toHaveBeenCalled();
		
	});
	
	it('should fail when validating caregiver creation form', async () => {
		// @ts-ignore
		let form = new FormGroup({
				firstName: new FormControl('Sidou', {
					validators: [Validators.required, Validators.minLength(3)],
					nonNullable: true
				}),
				lastName: new FormControl('Bennaceur', {
					validators: [Validators.required, Validators.minLength(3)],
					nonNullable: true
				}),
				address: new FormControl('101, rue des Atrebates', {
					validators: [Validators.required, Validators.minLength(3)],
					nonNullable: true
				}),
				city: new FormControl('Arras', {
					validators: [Validators.required, Validators.minLength(3)],
					nonNullable: true
				}),
				zipCode: new FormControl('62000', {
					validators: [Validators.required, Validators.minLength(5)],
					nonNullable: true
				}),
				country: new FormControl('FRANCE', {validators: [Validators.required], nonNullable: true}),
				email: new FormControl('sa.bennaceur@gmail.com', {
					validators: [Validators.required, Validators.email],
					nonNullable: true
				}),
				phoneNumber: new FormControl('0764017528', {
					validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
					nonNullable: true
				}),
				caregiverType: new FormControl('', {
					validators: [Validators.required, Validators.pattern("^(GROOMER|VET|TRAINER$)")],
					nonNullable: true
				}),
				homeService: new FormControl(false, {validators: [Validators.required], nonNullable: true}),
				isSubscribed: new FormControl(false, {validators: [Validators.required], nonNullable: true}),
				workingDays: new FormControl([], component.minLengthArray(1)),
				palsHandled: new FormControl(["DOG"], {
					validators: [Validators.required, component.minLengthArray(1)],
					nonNullable: true
				}),
				priceRating: new FormControl(3.2, {validators: [Validators.required], nonNullable: true}),
				serviceRating: new FormControl(4.1, {validators: [Validators.required], nonNullable: true}),
				appointmentDuration: new FormControl(0.25, {validators: [Validators.required], nonNullable: true}),
			}
		)
		
		// @ts-ignore
		component.form = form;
		// @ts-ignore
		expect(component.form.get("workingDays")?.valid).toBeFalsy();
		expect(component.form.get("caregiverType")?.valid).toBeFalsy();
		
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