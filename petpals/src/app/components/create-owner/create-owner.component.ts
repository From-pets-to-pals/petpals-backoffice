import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LocationComponent} from "../location/location.component";
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {CommonModule, NgForOf} from "@angular/common";
import options from "../../models/menus/select.options";
import dayjs from "dayjs"
import {Pal} from "../../models/interfaces/pals";
import {CreateOwner} from "../../models/interfaces/owner";
import {PetpalsApiService} from "../../services/middleware/petpals-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
    MatStep,
    MatStepContent,
    MatStepLabel,
    MatStepper,
    MatStepperIcon,
    MatStepperNext,
    MatStepperPrevious
} from "@angular/material/stepper";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-create-owner',
    standalone: true,
    imports: [
        CommonModule,
        LocationComponent,
        MatAccordion,
        MatButton,
        MatDivider,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatFormField,
        MatHint,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        NgForOf,
        ReactiveFormsModule,
        MatExpansionPanelDescription,
        MatStepper,
        MatStep,
        MatStepLabel,
        MatStepperPrevious,
        MatStepperNext,
        MatStepperIcon,
        MatIcon,
        MatStepContent
    ],
    templateUrl: './create-owner.component.html',
    styleUrl: './create-owner.component.css'
})
export class CreateOwnerComponent {
    panelOpenState = false;
    sexOptions = options.gender;
    speciesOptions = options.palsHandled;
    passportOptions = options.passport;
    maxBirthDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    minDate = dayjs().add(1, 'day').format('YYYY-MM-DD')

    constructor(private fb: FormBuilder, private apiService: PetpalsApiService, private _snackBar: MatSnackBar) {
    }

    palIdentityInformationFormGroup = new FormGroup(
        {
            name: new FormControl('', {
                validators: [Validators.required, Validators.minLength(3)],
                nonNullable: true
            }), birthDate: new FormControl(null, {
                nonNullable: false
            }), shortName: new FormControl(null, {
                nonNullable: false
            }), isMale: new FormControl(true, {
                validators: [Validators.required],
                nonNullable: true
            }), specie: new FormControl('DOG', {
                validators: [Validators.required],
                nonNullable: true
            }), breed: new FormControl('', {
                validators: [Validators.required, Validators.minLength(3)],
                nonNullable: true
            }), hasPassport: new FormControl(false, {
                validators: [Validators.required],
                nonNullable: true
            }), icadIdentifier: new FormControl('', {
                validators: [Validators.required, Validators.pattern("^(250)(26|22)\\d{10}$")],
                nonNullable: true
            })
        }
    );
    palMedicalInformationFormGroup =  new FormGroup(
        {
            nextVaccine: new FormControl(null, {
                validators: [Validators.required],
                nonNullable: true
            }),
            nextPlannedVetApp: new FormControl(null, {
                nonNullable: false
            }),
            isVaccinated: new FormControl(false, {
                validators: [Validators.required],
                nonNullable: true
            }),
            isSterilized: new FormControl(false, {
                validators: [Validators.required],
                nonNullable: true
            }),
        }
    )

    palMeasurementFormGroup = new FormGroup(
        {
            weight: new FormControl(0.1, {
                validators: [Validators.required, Validators.min(0.1), Validators.max(200.0)],
                nonNullable: true
            }),
            height: new FormControl(0.1, {
                validators: [Validators.required, Validators.min(0.1), Validators.max(200.0)],
                nonNullable: true
            }),
        }
    )
    /** Form init **/
    form = new FormGroup({
        location: new FormControl("", {
            validators: [Validators.required],
            nonNullable: true
        }),
        deviceId: new FormControl('', {
            validators: [Validators.required, Validators.minLength(3)],
            nonNullable: true
        }),
        email: new FormControl('', {
            validators: [Validators.required, Validators.email],
            nonNullable: true
        }),
        username: new FormControl('', {
            validators: [Validators.required, Validators.minLength(4)],
            nonNullable: true
        }),
        phoneNumber: new FormControl('', {
            validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
            nonNullable: true
        }),
        pals: new FormArray(
            [new FormGroup({
                palIdentityInformation: this.palIdentityInformationFormGroup,
                palMedicalInformation: this.palMedicalInformationFormGroup,
                palMeasurement: this.palMeasurementFormGroup
            })]
        )
    })

    /** Location function **/
    GetLocationData(something: string) {
        this.form.get("location")?.setValue(something)
        this.form.get("deviceId")?.setValue(window.navigator.userAgent)
    }

    /** Form actions **/
    AddPalToList() {
        this.form.controls["pals"].controls.push(
            new FormGroup({
                palIdentityInformation: this.palIdentityInformationFormGroup,
                palMedicalInformation: this.palMedicalInformationFormGroup,
                palMeasurement: this.palMeasurementFormGroup
            }))
    }

    RemoveLastPal() {
        this.form.controls["pals"].controls.pop();
    }

    RemovePal(i: number) {
        this.form.controls["pals"].controls.splice(i, 1);
    }

    ShowList() {
        for (let i = 0; i < this.form.controls["pals"].controls.length; i++) {
            console.log(this.form.controls.pals.controls[i].controls.palIdentityInformation.get('name')!.value)
        }
        console.log(this.form.valid)
        if (this.form.valid) {
            const ownerToCreate = this.mapOwner()
            this.GetPalsApiService().createOwner(ownerToCreate).then(res => {
                console.log(res.data)
                this.openSnackBar("Registration successful", "Close")
            }).catch(err => {
                console.log(err)
            })
        } else {
            this.openSnackBar("Invalid form", "Close")
        }
    }

    /** Mappers **/

    mapOwner() {
        const palsList: Pal[] = [];
        const palsInForm = this.form.controls.pals.controls
        for (let i = 0; i < palsInForm.length; i++) {
            palsList.push(
                {
                    palMeasurement: {
                        weight: palsInForm[i].controls.palMeasurement.get("weight")!.value,
                        height: palsInForm[i].controls.palMeasurement.get("height")!.value,
                    }, palMedicalInformation: {
                        isVaccinated: palsInForm[i].controls.palMedicalInformation.get("isVaccinated")!.value,
                        medicalHistory: [],
                        nextVaccine: palsInForm[i].controls.palMedicalInformation.get("nextVaccine")!.value,
                        nextPlannedVetApp: palsInForm[i].controls.palMedicalInformation.get("nextPlannedVetApp")!.value,
                        isSterilized: palsInForm[i].controls.palMedicalInformation.get("isSterilized")!.value
                    },
                    palIdentityInformation: {
                        name: palsInForm[i].controls.palIdentityInformation.get("name")!.value,
                        shortName: palsInForm[i].controls.palIdentityInformation.get("shortName")!.value,
                        birthDate: palsInForm[i].controls.palIdentityInformation.get("birthDate")!.value,
                        isMale: palsInForm[i].controls.palIdentityInformation.get("isMale")!.value,
                        specie: palsInForm[i].controls.palIdentityInformation.get("specie")!.value,
                        breed: palsInForm[i].controls.palIdentityInformation.get("breed")!.value,
                        icadIdentifier: palsInForm[i].controls.palIdentityInformation.get("icadIdentifier")!.value,
                        hasPassport: palsInForm[i].controls.palIdentityInformation.get("hasPassport")!.value
                    }
                }
            )
        }
        const owner: CreateOwner = {
            email: this.form.get('email')!.value,
            username: this.form.get('username')!.value,
            deviceId: this.form.get('deviceId')!.value,
            location: this.form.get('location')!.value,
            pals: palsList
        }
        return owner;
    }

    /** Service */

    GetPalsApiService(){
        return this.apiService;
    }

    /** Snackbar **/
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            horizontalPosition: "center",
            verticalPosition: "top",
        });
    }
}
