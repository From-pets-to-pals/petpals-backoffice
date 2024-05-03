import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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

    constructor(private fb: FormBuilder) {  }
    form = this.fb.group({
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
        }),
        pals: this.fb.array(
            [{
                palIdentityInformation: this.fb.group(
                    {
                        name: new FormControl('dsqdqs', {
                            validators: [Validators.required],
                            nonNullable: true
                        }), birthDate: new FormControl(null, {
                            validators: [Validators.required],
                            nonNullable: true
                        }), shortName: new FormControl('', {
                            validators: [Validators.required, Validators.minLength(4)],
                            nonNullable: true
                        }), isMale: new FormControl(true, {
                            validators: [Validators.required],
                            nonNullable: true
                        }),specie: new FormControl('', {
                            validators: [Validators.required],
                            nonNullable: true
                        }),breed: new FormControl('', {
                            validators: [Validators.required],
                            nonNullable: true
                        }),hasPassport: new FormControl(false, {
                            validators: [Validators.required],
                            nonNullable: true
                        }),
                    }
                ),
                palMedicalInformation:  this.fb.group(
                    {
                       nextVaccine: new FormControl(null, {
                            validators: [Validators.required],
                            nonNullable: true
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
                ),
                palMeasurement:  this.fb.group(
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
                ),
            }]
        )
    })

    GetData(something: string) {
        this.form.get("location")?.setValue(something)
        console.log(this.form.value)
    }

    AddPalToList() {
        // @ts-ignore
        this.form.controls["pals"].value.push(
        // @ts-ignore
           this.fb.group( {
               palIdentityInformation: this.fb.group(
                   {
                       name: new FormControl('dsqdqs', {
                           validators: [Validators.required, Validators.minLength(4)],
                           nonNullable: true
                       }), birthDate: new FormControl(null, {
                           validators: [Validators.required],
                           nonNullable: true
                       }), shortName: new FormControl('', {
                           validators: [Validators.required, Validators.minLength(4)],
                           nonNullable: true
                       }), isMale: new FormControl(true, {
                           validators: [Validators.required],
                           nonNullable: true
                       }),specie: new FormControl('', {
                           validators: [Validators.required],
                           nonNullable: true
                       }),breed: new FormControl('', {
                           validators: [Validators.required],
                           nonNullable: true
                       }),hasPassport: new FormControl(false, {
                           validators: [Validators.required],
                           nonNullable: true
                       }),
                   }
               ),
               palMedicalInformation:  this.fb.group(
                   {
                       nextVaccine: new FormControl(null, {
                           validators: [Validators.required],
                           nonNullable: true
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
               ),
               palMeasurement:  this.fb.group(
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
               ),
            }))
    }

    RemoveLastPal(){
        this.form.controls["pals"].value.pop();
    }

    RemovePal(i: number){
        this.form.controls["pals"].value.splice(i,1);
    }

    updatePalIdentityInformation(event: any, i: number, key: string){
        console.log(this.form.controls["pals"].value)
    }
    updatePalMedicalInformation(event: any, i: number, key: string){
        // @ts-ignore
        this.pals[i].palMedicalInformation[key] = event.target.value
    }

    updatePalMeasurement(event: any, i: number, key: string){
        const value = event.target.value;
        if(String(value).match("^[0-9]{1,4}\.[0-9]{1}$")){
            // @ts-ignore
            this.pals[i].palMeasurement[key] = value
            return
        }
        // @ts-ignore
        this.pals[i].palMeasurement[key] = 0.1
    }
    ngOnInit(){
        // @ts-ignore
        console.log(this.form.controls.pals[0].controls.get('palIdentityInformation'))
    }
}
