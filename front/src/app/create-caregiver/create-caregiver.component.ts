import {Component} from '@angular/core';
import {CaregiversApiService} from "../services/caregivers/caregivers-api.service";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import type {Caregiver} from '../inter';
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
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
import {getToken, reducer, updateToken} from "../app.state";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-create-caregiver',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatSelect, MatOption, MatInput, MatLabel, MatHint, MatDivider, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatButton, NgForOf, FormsModule, MatTooltip],
  templateUrl: './create-caregiver.component.html',
  styleUrl: './create-caregiver.component.css',

})
export class CreateCaregiverComponent {
  title = 'petpals';
  isRegistered = false;
  caregiverOptions = [
    {
      label:"Groomer",
      value:"GROOMER"
    },
    {
      label:"Éducateur",
      value:"TRAINER"
    },
    {
      label:"Vétérinaire",
      value:"VET"
    },
  ]


  days = [
    {
      label:"Lundi",
      value:"MONDAY"
    },
    {
      label:"Mardi",
      value:"TUESDAY"
    },
    {
      label:"Mercredi",
      value:"WEDNESDAY"
    },
    {
      label:"Jeudi",
      value:"THURSDAY"
    },
    {
      label:"Vendredi",
      value:"FRIDAY"
    },
    {
      label:"Samedi",
      value:"SATURDAY"
    },
    {
      label:"Dimanche",
      value:"SUNDAY"
    }
  ]
  constructor(private _snackBar: MatSnackBar, private store:Store, private caregiverApiService: CaregiversApiService,private formBuilder: FormBuilder) {

  }
  workDays = new FormControl([], this.minLengthArray(1));
  minLengthArray(min: number) {
    return (c: AbstractControl): { [p: string]: any } | null => {
      if (c.value.length >= min)
        return null;

      return { 'minLengthArray': {valid: false }};
    }
  }
  panelOpenState = false;
  form = new FormGroup({
      firstName : new FormControl('', {validators: [Validators.required, Validators.minLength(3)], nonNullable: true}),
      lastName: new FormControl('', {validators: [Validators.required, Validators.minLength(3)], nonNullable: true}),
      address:new FormControl('', {validators: [Validators.required, Validators.minLength(3)], nonNullable: true}),
      city: new FormControl('', {validators: [Validators.required, Validators.minLength(3)], nonNullable: true}),
      zipCode: new FormControl('', {validators: [Validators.required, Validators.minLength(5)], nonNullable: true}),
      country: new FormControl('FRANCE', {validators: [Validators.required], nonNullable: true}),
      email: new FormControl('', {validators: [Validators.required,Validators.email], nonNullable: true}),
      phoneNumber: new FormControl('', {validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)], nonNullable: true}),
      caregiverType: new FormControl('', {validators: [Validators.required, Validators.pattern("^(GROOMER|VET|TRAINER$)")], nonNullable: true}),
      homeService: new FormControl(false, {validators: [Validators.required], nonNullable: true}),
      isSubscribed: new FormControl(false, {validators: [Validators.required], nonNullable: true}),
      workingDays: this.workDays,
      palsHandled: new FormControl([], {validators: [Validators.required, this.minLengthArray(1)], nonNullable: true}),
      priceRating: new FormControl(3.2, {validators: [Validators.required], nonNullable: true}),
      serviceRating: new FormControl(4.1, {validators: [Validators.required], nonNullable: true}),
      appointmentDuration: new FormControl(0.25, {validators: [Validators.required], nonNullable: true}),
    }
  )
  token:string = "";

  ngOnInit(){
    this.getFromBack()
  }
  getFromBack(){
    this.caregiverApiService.get().then(res => {
      // @ts-ignore
      console.log(res.data)
    })
  }

  createCaregiver(){
    if(this.form.valid && !this.isRegistered){
    // @ts-ignore
      let toCreate = {
        firstName: this.form.get("firstName")!.value,
        lastName: this.form.get("lastName")!.value,
        email: this.form.get("email")!.value,
        phoneNumber: this.form.get("phoneNumber")!.value,
        address:this.form.get("address")!.value,
        city: this.form.get("city")!.value,
        zipCode: this.form.get("zipCode")!.value,
        country: this.form.get("country")!.value,
        workingDays:this.form.get("workingDays")!.value,
        palsHandled: this.form.get("palsHandled")!.value,
        homeService: this.form.get("homeService")!.value,
        appointmentDuration: this.form.get("appointmentDuration")!.value,
        caregiverType: this.form.get("caregiverType")!.value,
        isSubscribed: false,
        serviceRating: this.form.get("serviceRating")!.value,
        priceRating: this.form.get("priceRating")!.value,
      } as Caregiver;
      this.caregiverApiService.createCaregiver(
      toCreate
    ).then(res => {
      this.isRegistered = true;
      this.token = res.data;
      this.store.dispatch(updateToken(res.data))
      return this.openSnackBar("Registration successful");
    }).catch(err => {
          return this.openSnackBar(err.message);
      })
    }
    this.openSnackBar(this.isRegistered ? "User just created an account":"Invalid inputs.")
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok', {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }
}
