import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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
import {Pal} from "../../models/interfaces/pals";
import options from "../../models/menus/select.options";
import dayjs from "dayjs"

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
        MatExpansionPanelDescription
    ],
    templateUrl: './create-owner.component.html',
    styleUrl: './create-owner.component.css'
})
export class CreateOwnerComponent {
    panelOpenState = false;
    sexOptions = options.gender;
    speciesOptions = options.palsHandled;
    passportOptions = options.passport;
    maxBirthDate= dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    // @ts-ignore
    pals: Pal[] = [{
        palIdentityInformation:
            {
                name: "",
                shortName: "",
                birthDate: new Date(),
                isMale: true,
                specie: "",
                breed: "",
                icadIdentifier: "",
                hasPassport: false
            },
        palMedicalInformation:
            {
                isVaccinated: false,
                medicalHistory: [],
                nextVaccine: null,
                nextPlannedVetApp: null,
                isSterilized: false
            },
        palMeasurement:
            {
                weight: 0.1,
                height: 0.1
            }
    }]
    form = new FormGroup({
        location: new FormControl("", {
            validators: [Validators.required],
            nonNullable: true
        }),
        deviceId: new FormControl(window.navigator.userAgent, {
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
        })
    })

    GetData(something: string) {
        this.form.get("location")?.setValue(something)
        console.log(this.form.value)
    }

    AddPalToList() {
        // @ts-ignore
        this.pals.push(
            {
                palIdentityInformation:
                    {
                        name: "",
                        shortName: "",
                        birthDate: new Date(),
                        isMale: true,
                        specie: "DOG",
                        breed: "",
                        icadIdentifier: "",
                        hasPassport: false
                    },
                palMedicalInformation:
                    {
                        isVaccinated: false,
                        medicalHistory: [],
                        nextVaccine: null,
                        nextPlannedVetApp: null,
                        isSterilized: false
                    },
                palMeasurement:
                    {
                        weight: 0.1,
                        height: 0.1
                    }
            })
    }

    RemoveLastPal(){
        this.pals.pop();
    }

    RemovePal(i: number){
        this.pals.splice(i,1);
    }

    updatePalIdentityInformation(event: any, i: number, key: string){
        // @ts-ignore
        this.pals[i].palIdentityInformation[key] = event.target.value
        console.log(this.pals)
    }
    ngOnInit(){
        console.log(this.maxBirthDate)
    }
}
