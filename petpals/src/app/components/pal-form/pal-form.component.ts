import {Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl} from '@angular/forms';
import dayjs from "dayjs";
import { templates } from "../../models/menus/formatters";
import {MatStep, MatStepper, MatStepperIcon, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription, MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {PetpalsApiService} from "../../services/middleware/petpals-api.service";
import localOptions from "../../models/menus/select.options";


@Component({
    selector: 'app-pal-form',
    templateUrl: './pal-form.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatStepper,
        MatStep,
        MatIcon,
        MatFormField,
        MatSelect,
        MatOption,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelTitle,
        MatExpansionPanelDescription,
        MatExpansionPanelHeader,
        MatDivider,
        MatButton,
        MatStepperPrevious,
        MatStepperNext,
        MatStepperIcon,
        MatInput,
        MatLabel,
        NgForOf,
        NgIf,
    ],
    styleUrls: ['./pal-form.component.css']
})
export class PalFormComponent implements OnInit {

    sexOptions = localOptions.gender;
    speciesOptions: any[] = []
    passportOptions = localOptions.passport
    maxBirthDate = dayjs().subtract(2, 'day').format(templates.format.date);
    minDate = dayjs().add(2, 'day').format(templates.format.date);
    breedsOptions = {dogBreeds: [], catBreeds: [], nacBreeds: []}
    breedList: any[] = [];
    @ViewChild('stepper') private myStepper: MatStepper | undefined;

    @Input() reload: boolean = false;
    @Input() number: number = 1;


    constructor( private apiService: PetpalsApiService) { }

    ngOnInit(): void {
        this.getCreateOwnerOptions().then((data: any) => {
            this.speciesOptions = data['species'];
            this.breedsOptions = {
                dogBreeds: data['dogBreeds'],
                catBreeds: data['catBreeds'],
                nacBreeds: data['nacBreeds']
            };
        })

    }

    getBreedForSpecie(): any[] {
        console.log(this.pal.controls['palIdentityInformation'].get('specie')!.value)
        switch (this.pal.controls['palIdentityInformation'].get('specie')!.value.id) {
            case 2:
                this.breedList = this.breedsOptions.catBreeds;
                return this.breedList;
            case 3:
                this.breedList = this.breedsOptions.nacBreeds;
                return this.breedList;
            default:
                this.breedList = this.breedsOptions.dogBreeds
                return this.breedList;
        }
    }

    @Input() pal: FormGroup = new FormGroup({
            palIdentityInformation: this.buildPalIdentityInformationFormGroup(),
        palMedicalInformation: this.buildPalMedicalInformationFormGroup(),
        palMeasurement: this.buildPalMeasurementFormGroup()
    })
    panelOpenState: boolean = true;

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
                }), specie: new FormControl(null, {
                    validators: [Validators.required],
                    nonNullable: true
                }), breed: new FormControl(null, {
                    validators: [Validators.required, Validators.minLength(3)],
                    nonNullable: true
                }), hasPassport: new FormControl(false, {
                    validators: [Validators.required],
                    nonNullable: true
                }), icadIdentifier: new FormControl('', {
                    validators: [Validators.required, Validators.pattern(templates.regex.icadIdentifier)],
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

    asFormGroup(formControl: AbstractControl) {
        return formControl as FormGroup
    }


    getCreateOwnerOptions() {
        return this.apiService.getCreateOwnerOptions()
    }

    resetStepper(): void {
        if(this.myStepper) {
            this.myStepper!.selectedIndex = 0;
        }
    }

}
