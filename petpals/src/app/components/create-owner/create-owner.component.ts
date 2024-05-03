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
    minDate= dayjs().add(1, 'day').format('YYYY-MM-DD')

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
            [this.fb.group ({
                palIdentityInformation: this.fb.group(
                    {
                        name: new FormControl('', {
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
                        }),specie: new FormControl('DOG', {
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
            })]
        )
    })

    GetData(something: string) {
        this.form.get("location")?.setValue(something)
        console.log(this.form.value)
    }

    AddPalToList() {
        // @ts-ignore
        this.form.controls["pals"].controls.push(
        // @ts-ignore
           this.fb.group( {
               palIdentityInformation: this.fb.group(
                   {
                       name: new FormControl('', {
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
        this.form.controls["pals"].controls.pop();
    }

    RemovePal(i: number){
        this.form.controls["pals"].controls.splice(i,1);
    }

    ShowList(){
        for(let i = 0; i < this.form.controls["pals"].controls.length; i ++){
        // @ts-ignore
        console.log(this.form.controls.pals.controls[i].controls.palIdentityInformation.get('name').value)

        }
        console.log(this.form.valid)

    }

    ngOnInit(){
        // @ts-ignore
        console.log(this.form.controls["pals"].controls[0])
        // @ts-ignore
        console.log(this.form.controls.pals.controls[0].controls.palIdentityInformation.get('name').value)
    }
}
