import {Component} from '@angular/core';
import {CaregiversApiService} from "../../services/caregivers/caregivers-api.service";
import {
	AbstractControl,
	FormBuilder,
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import type {Caregiver} from '../../models/interfaces/caregiver';
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatDivider} from "@angular/material/divider";
import {
	MatAccordion,
	MatExpansionPanel,
	MatExpansionPanelDescription,
	MatExpansionPanelHeader,
	MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {Store} from "@ngrx/store";
import {updateToken} from "../../stores/app.state";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTooltip} from "@angular/material/tooltip";
import options from '../../models/menus/select.options';
import {MatOptionModule} from "@angular/material/core";
import {Body, fetch, ResponseType} from "@tauri-apps/api/http";
import {environment} from "../../environments/environment";

@Component({
	selector: 'app-create-caregiver',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormField, MatSelectModule, MatOptionModule, MatInput, MatLabel, MatHint, MatDivider, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatButton, NgForOf, FormsModule, MatTooltip],
	templateUrl: './create-caregiver.component.html',
	styleUrl: './create-caregiver.component.css',
	
})
export class CreateCaregiverComponent {
	title = 'petpals - add caregiver';
	isRegistered = false;
	caregiverTypes = options.caregiverType;
	days = options.days;
	homeService = options.homeService;
	palsHandled = options.palsHandled;
	
	getCareGiverApiService(){
		return this.caregiverApiService;
	}
	constructor(private _snackBar: MatSnackBar, private store: Store, private caregiverApiService: CaregiversApiService, private formBuilder: FormBuilder) {
	}
	
	minLengthArray(min: number) {
		return (c: AbstractControl): { [p: string]: any } | null => {
			if (c.value.length >= min)
				return null;
			return {'minLengthArray': {valid: false}};
		}
	}
	
	panelOpenState = false;
	form = new FormGroup({
			firstName: new FormControl('', {validators: [Validators.required, Validators.minLength(3)], nonNullable: true}),
			lastName: new FormControl('', {validators: [Validators.required, Validators.minLength(3)], nonNullable: true}),
			address: new FormControl('', {validators: [Validators.required, Validators.minLength(3)], nonNullable: true}),
			city: new FormControl('', {validators: [Validators.required, Validators.minLength(3)], nonNullable: true}),
			zipCode: new FormControl('', {validators: [Validators.required, Validators.minLength(5)], nonNullable: true}),
			country: new FormControl('', {validators: [Validators.required], nonNullable: true}),
			email: new FormControl('', {validators: [Validators.required, Validators.email], nonNullable: true}),
			phoneNumber: new FormControl('', {
				validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
				nonNullable: true
			}),
			caregiverType: new FormControl('', {
				validators: [Validators.required, Validators.pattern("^(GROOMER|VET|TRAINER$)")],
				nonNullable: true
			}),
			homeService: new FormControl(false, {validators: [Validators.required], nonNullable: true}),
			isSubscribed: new FormControl(false, {validators: [Validators.required], nonNullable: true}),
			workingDays: new FormControl([], this.minLengthArray(1)),
			palsHandled: new FormControl([], {
				validators: [Validators.required, this.minLengthArray(1)],
				nonNullable: true
			}),
			priceRating: new FormControl(3.2, {validators: [Validators.required], nonNullable: true}),
			serviceRating: new FormControl(4.1, {validators: [Validators.required], nonNullable: true}),
			appointmentDuration: new FormControl(0.25, {validators: [Validators.required], nonNullable: true}),
		}
	)
	token: string = "";
	
	ngOnInit() {
		this.getFromBack()
	}
	
	getFromBack() {
		if (!window.__TAURI__) {
			this.caregiverApiService.get().then(res => {
				console.log(res.data)
			})
		} else {
			fetch(environment.caregivers.url + "hello", {
				method: "GET",
				timeout: 30, //seconds
				responseType: ResponseType.Text,
				headers:{
					'API-KEY': environment.caregivers.apiKey
				}
			}).then((res) => {
				console.log(res.data);
			});
		}
	}
	
	createCaregiver() {
		if (this.form.valid && !this.isRegistered) {
			let toCreate = this.mapCaregiver();
			if (!window.__TAURI__) {
				console.log("axios")
				this.caregiverApiService
					.createCaregiver(toCreate)
					.then(res => {
						console.log("res")
						this.isRegistered = true;
						this.token = res.data;
						this.store.dispatch(updateToken(res.data))
						this.openSnackBar("Registration successful", "Close");
					})
					.catch(err => {
						this.openSnackBar(err.message, "Close");
					})
			} else {
				fetch(environment.caregivers.url + "caregivers/create", {
					method: "POST",
					timeout: 30, //seconds
					responseType: ResponseType.Text,
					headers:{
						'API-KEY': environment.caregivers.apiKey
					},
					body: Body.json(toCreate)
					
				}).then((res:any) => {
					this.isRegistered = true;
					this.token = res.data;
					this.store.dispatch(updateToken(res.data))
					this.openSnackBar("Welcome aboard", "Ok")
				}).catch(err => {
					this.openSnackBar(err.message, "Close");
				});
			}
			
		} else {
			this.openSnackBar("Invalid inputs", "Close");
		}
	}
	
	 mapCaregiver() {
		return {
			firstName: this.form.get("firstName")!.value,
			lastName: this.form.get("lastName")!.value,
			email: this.form.get("email")!.value,
			phoneNumber: this.form.get("phoneNumber")!.value,
			address: this.form.get("address")!.value,
			city: this.form.get("city")!.value,
			zipCode: this.form.get("zipCode")!.value,
			country: this.form.get("country")!.value,
			workingDays: this.form.get("workingDays")!.value,
			palsHandled: this.form.get("palsHandled")!.value,
			homeService: this.form.get("homeService")!.value,
			appointmentDuration: this.form.get("appointmentDuration")!.value,
			caregiverType: this.form.get("caregiverType")!.value,
			isSubscribed: false,
			serviceRating: this.form.get("serviceRating")!.value,
			priceRating: this.form.get("priceRating")!.value,
		} as Caregiver;
	}
	
	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
			horizontalPosition: "center",
			verticalPosition: "top",
		});
	}
}
