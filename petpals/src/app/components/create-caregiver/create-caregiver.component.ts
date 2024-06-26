import {Component} from '@angular/core';
import {PetpalsApiService} from "../../services/middleware/petpals-api.service";
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
import {updateToken} from "../../stores/app.state";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTooltip} from "@angular/material/tooltip";
import options from '../../models/menus/select.options';
import createCaregiverForm from "../../models/menus/control-names-to-displayable-names";
import {MatOptionModule} from "@angular/material/core";
import {Store} from "@ngrx/store";
import {invoke} from "@tauri-apps/api/tauri";

@Component({
    selector: 'app-create-caregiver',
    standalone: true,
    imports: [ReactiveFormsModule, MatFormField, MatSelectModule, MatOptionModule, MatInput, MatLabel, MatHint, MatDivider, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatButton, NgForOf, FormsModule, MatTooltip],
    templateUrl: './create-caregiver.component.html',
    styleUrl: './create-caregiver.component.css',

})
export class CreateCaregiverComponent {
    title = 'petpals - add caregiver';
    public isRegistered = false;
    caregiverTypes = options.caregiverType;
    days = options.days;
    homeService = options.homeService;
    palsHandled = options.palsHandled;
    message = "";
    panelOpenState = false;

    getCareGiverApiService() {
        return this.caregiverApiService;
    }

    constructor(private store: Store, private _snackBar: MatSnackBar, private caregiverApiService: PetpalsApiService, private formBuilder: FormBuilder) {
    }

    minLengthArray(min: number) {
        return (c: AbstractControl): { [p: string]: any } | null => {
            if (c.value.length >= min)
                return null;
            return {'minLengthArray': {valid: false}};
        }
    }

    form = new FormGroup({
            firstName: new FormControl('', {
                validators: [Validators.required, Validators.minLength(3),],
                nonNullable: true
            }),
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
            homeService: new FormControl<boolean>(false, {validators: [Validators.required], nonNullable: true}),

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

    createCaregiver() {
        if (this.form.valid && !this.isRegistered) {
            let toCreate = this.mapCaregiver();
            if (!window.__TAURI__) {
                this.caregiverApiService
                    .createCaregiver(toCreate)
                    .then(res => {
                        this.isRegistered = true;
                        this.token = res.data;
                        this.openSnackBar("Registration successful", "Close");
                        this.store.dispatch(updateToken(res.data))
                    })
                    .catch(err => {
                        this.openSnackBar(err.message, "Close");
                    })
            } else {
                const createCaregiver = toCreate;
                invoke<string>("create_caregiver", {createCaregiver}).then((res: any) => {
                    this.isRegistered = true;
                    if (res.statusCode === 200) {
                        this.token = res.data;
                        this.store.dispatch(updateToken(res.data))
                        this.openSnackBar("Welcome aboard", "Ok")
                    } else {
                        this.openSnackBar(`Error while creating owner : ${res.data}`, "Close")
                    }
                });
            }
        } else {
            let invalidControls:string[] = [];
            // @ts-ignore
            for(const control in this.form.controls){
                // @ts-ignore
                if(!control.isValid && control !== "isSubscribed" &&control !== "priceRating" && control !== "serviceRating" && control !== "homeService"){
                    // @ts-ignore
                    invalidControls.push(createCaregiverForm[control]);
                }
            }
            this.openSnackBar(`Invalid inputs, please check your ${invalidControls.join(", ")}`, "Close");
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
