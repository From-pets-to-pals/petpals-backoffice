import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {CommonModule, NgForOf} from "@angular/common";
import options from "../../models/menus/select.options";
import dayjs from "dayjs"
import {Breed, Pal, Specie} from "../../models/interfaces/pals";
import {CreateOwner} from "../../models/interfaces/owner";
import {PetPalsApiService} from "../../services/middleware/pet-pals-api.service";
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
import {formatDate, templates} from "../../models/menus/formatters";
import {updateToken, getToken, selectToken, getLanguage} from "../../stores/app.state";
import {Store} from "@ngrx/store";
import {invoke} from "@tauri-apps/api/tauri";
import {Country, CreateOwnerOptions} from "../../models/interfaces/common";
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
        MatStepContent,
        MatAutocompleteTrigger,
        MatAutocomplete
    ],
    templateUrl: './create-owner.component.html',
    styleUrl: './create-owner.component.css'
})
export class CreateOwnerComponent {
    panelOpenState = false;
    isRegistered  = getToken === null;
    sexOptions = options.gender;
    speciesOptions = options.palsHandled;
    passportOptions = options.passport;
    maxBirthDate = dayjs().subtract(2, 'day').format(templates.format.date)
    minDate = dayjs().add(2, 'day').format(templates.format.date)
    countries: Country[] = [];
    species: Specie[] = [];
    dogBreeds : Breed[] = [];
    catBreeds: Breed[] = [];
    nacBreeds: Breed[] = [];
    options: CreateOwnerOptions | undefined;
    user_country : Country | undefined;
    icad_placeholder : string | undefined;
    constructor(private store: Store, private apiService: PetPalsApiService, private _snackBar: MatSnackBar) {

    }

    ngOnInit(){
        this.apiService.getOwnerOptions().then(res => {
            this.species = res.species;
            this.dogBreeds = res.dogBreeds;
            this.catBreeds = res.catBreeds;
            this.countries  = res.countries;
            this.nacBreeds = res.nacBreeds;
            this.options = res;
            this.user_country = res.countries[0];
            this.icad_placeholder = `${this.user_country?.number}...`
        }).catch(err => console.log(err));
    }

    buildPalIdentityInformationFormGroup() {
        return new FormGroup(
            {
                name: new FormControl('', {
                    validators: [Validators.required, Validators.minLength(3)],
                    nonNullable: true
                }), birthDate: new FormControl(null, {
                    nonNullable: false
                }), shortname: new FormControl(null, {
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
                    validators: [Validators.pattern(templates.regex.icadIdentifier), Validators.required],
                    nonNullable: true
                })
            }
        );
    }


    buildPalMedicalInformationFormGroup(){
        return new FormGroup(
            {
                nextVaccine: new FormControl(null,
                    {
                        nonNullable: false
                    }
                ),
                nextPlannedVetApp: new FormControl(null,
                    {
                        nonNullable: false
                    }
                ),
                isVaccinated: new FormControl(false,
                    {
                        validators: [Validators.required],
                        nonNullable: true
                    }
                ),
                isSterilized: new FormControl(false,
                    {
                        validators: [Validators.required],
                        nonNullable: true
                    }
                ),
            }
        )
    }


    buildPalMeasurementFormGroup(){
        return new FormGroup(
            {
                weight: new FormControl(0.1,
                    {
                        validators: [Validators.required, Validators.min(0.1), Validators.max(200.0)],
                        nonNullable: true
                    }
                ),
                height: new FormControl(0.1,
                    {
                        validators: [Validators.required, Validators.min(0.1), Validators.max(200.0)],
                        nonNullable: true
                    }
                ),
            }
        )
    }
    /** Form init **/
    form = new FormGroup({
        location: new FormControl("",
            {
                validators: [Validators.required],
                nonNullable: true
            }
        ),
        deviceId: new FormControl('',
            {
                validators: [Validators.required, Validators.minLength(3)],
                nonNullable: true
            }
        ),
        email: new FormControl('',
            {
                validators: [Validators.required, Validators.email],
                nonNullable: true
            }
        ),
        username: new FormControl('',
            {
                validators: [Validators.required, Validators.minLength(4)],
                nonNullable: true
            }
        ),
        phoneNumber: new FormControl('',
            {
                validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
                nonNullable: true
            }
        ),
        pals: new FormArray(
            [
                new FormGroup(
                    {
                        palIdentityInformation: this.buildPalIdentityInformationFormGroup(),
                        palMedicalInformation: this.buildPalMedicalInformationFormGroup(),
                        palMeasurement: this.buildPalMeasurementFormGroup()
                    }
                )
            ]
        )
    })

    /** Location function **/
    GetLocationData(something: string) {

        this.form.get("location")?.setValue(something)
        this.form.get("deviceId")?.setValue(window.navigator.userAgent)

    }

    /** Form actions **/

    filterDogBreeds(event : Event): void {
        const input = (event.target as HTMLInputElement).value;
        if(input === ""){
            // @ts-ignore
            this.dogBreeds = this.options?.dogBreeds;
        } else {
            // @ts-ignore
            this.dogBreeds = this.options?.dogBreeds.filter(o => o.name.toLowerCase().includes(input.toLowerCase()));
        }
    }

    filterCatBreeds(event : Event): void {
        const input = (event.target as HTMLInputElement).value;

        if(input === ""){
            // @ts-ignore
            this.catBreeds = this.options?.catBreeds;
        } else {
            // @ts-ignore
            this.catBreeds = this.options?.catBreeds.filter(o => o.name.toLowerCase().includes(input.toLowerCase()));
        }
    }

    filterNacBreeds(event : Event): void {
        const input = (event.target as HTMLInputElement).value;
        if(input === ""){
            // @ts-ignore
            this.nacBreeds = this.options?.nacBreeds;
        } else {
        // @ts-ignore
            this.nacBreeds = this.options?.nacBreeds.filter(o => o.name.toLowerCase().includes(input.toLowerCase()));
        }
    }

    AddPalToList() {
        this.form.controls["pals"].controls.push(
            new FormGroup(
                {
                    palIdentityInformation: this.buildPalIdentityInformationFormGroup(),
                    palMedicalInformation: this.buildPalMedicalInformationFormGroup(),
                    palMeasurement: this.buildPalMeasurementFormGroup()
                }
            )
        )
    }

    RemoveLastPal() {
        this.form.controls["pals"].controls.pop();
    }

    RemovePal(i: number) {
        this.form.controls["pals"].controls.splice(i, 1);
    }

    ShowList() {
        if (this.form.valid) {
            const ownerToCreate = this.mapOwner()
            if (!window.__TAURI__) {
                this.GetPalsApiService().createOwner(ownerToCreate).then(res => {
                    this.store.dispatch(updateToken(res.data))
                    this.openSnackBar("Registration successful", "Close")
                }).catch(err => {
                    this.openSnackBar(`Registration error ${err.response.data}`, "Close")
                })
            } else {
                const createOwner = ownerToCreate
                invoke<string>("create_owner", {createOwner}).then((res: any) => {
                    this.isRegistered = true;
                    this.store.dispatch(updateToken(res.data))
                    this.openSnackBar("Welcome aboard", "Ok")
                });
            }
        } else {
            let invalidPersonalInformations: string[] = [];
            let invalidPals:number[] = [];
            for(const control in this.form.controls){
                // @ts-ignore
                if(!control.isValid && control !== "pals" && control !== "location"){
                    invalidPersonalInformations.push(control.toString());
                }

                if(control === "pals"){
                    for(let i = 0; i < this.form.controls[control].controls.length; i++){
                        // @ts-ignore
                        if(!this.form.controls[control].controls[i].isValid){
                            invalidPals.push(i + 1);
                        }
                    }
                }
            }
            const errorMessage = `Invalid form, please check your ${invalidPersonalInformations.join(", ")} and the forms for pal(s) number ${invalidPals.join(", ")}.`;
            this.openSnackBar(errorMessage, "Close")
        }
    }

    /** Mappers **/
    mapOwner() {
        const palsList: Pal[] = [];
        const palsInForm = this.form.controls.pals.controls
        for (const palInForm of palsInForm) {
            palsList.push(
                {
                    palMeasurement: {
                        weight: palInForm.controls.palMeasurement.get("weight")!.value,
                        height: palInForm.controls.palMeasurement.get("height")!.value,
                    }, palMedicalInformation: {
                        isVaccinated: palInForm.controls.palMedicalInformation.get("isVaccinated")!.value,
                        medicalHistory: [],
                        // @ts-ignore
                        nextVaccine: formatDate(palInForm.controls.palMedicalInformation.get("nextVaccine")!.value),
                        // @ts-ignore
                        nextPlannedVetApp: formatDate(palInForm.controls.palMedicalInformation.get("nextPlannedVetApp")!.value),
                        isSterilized: palInForm.controls.palMedicalInformation.get("isSterilized")!.value
                    },
                    palIdentityInformation: {
                        name: palInForm.controls.palIdentityInformation.get("name")!.value,
                        shortname: palInForm.controls.palIdentityInformation.get("shortname")!.value,
                        // @ts-ignore
                        birthDate: formatDate(palInForm.controls.palIdentityInformation.get("birthDate")!.value),
                        isMale: palInForm.controls.palIdentityInformation.get("isMale")!.value,
                        specie: palInForm.controls.palIdentityInformation.get("specie")!.value,
                        breed: palInForm.controls.palIdentityInformation.get("breed")!.value,
                        icadIdentifier: palInForm.controls.palIdentityInformation.get("icadIdentifier")!.value,
                        hasPassport: palInForm.controls.palIdentityInformation.get("hasPassport")!.value
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

    GetPalsApiService() {
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
