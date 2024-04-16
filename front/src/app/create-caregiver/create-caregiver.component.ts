import { Component } from '@angular/core';
import {CaregiversApiService} from "../services/caregivers/caregivers-api.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import type {CreateCaregiverForm, Caregiver} from '../inter';
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatDivider} from "@angular/material/divider";
import {
  MatAccordion,
  MatExpansionPanel, MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton} from "@angular/material/button";
@Component({
  selector: 'app-create-caregiver',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatSelect, MatOption, MatInput, MatLabel, MatHint, MatDivider, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatButton],
  templateUrl: './create-caregiver.component.html',
  styleUrl: './create-caregiver.component.css',

})
export class CreateCaregiverComponent {
  title = 'petpals';
  panelOpenState = false;
  form = this.formBuilder.group({
      firstName : new FormControl('', {validators: [Validators.required], nonNullable: true}),
      address:new FormControl('', {validators: [Validators.required], nonNullable: true}),
      appointmentDuration: new FormControl(0.0, {validators: [Validators.required], nonNullable: true}),
      caregiverType: new FormControl('VETS', {validators: [Validators.required], nonNullable: true}),
      city: new FormControl('', {validators: [Validators.required], nonNullable: true}),
      country: new FormControl('FRANCE', {validators: [Validators.required], nonNullable: true}),
      email: new FormControl('', {validators: [Validators.required], nonNullable: true}),
      homeService: new FormControl(false, {validators: [Validators.required], nonNullable: true}),
      isSubscribed: new FormControl(true, {validators: [Validators.required], nonNullable: true}),
      lastName: new FormControl('', {validators: [Validators.required], nonNullable: true}),
      palsHandled: new FormControl([], {validators: [Validators.required], nonNullable: true}),
      phoneNumber: new FormControl('', {validators: [Validators.required], nonNullable: true}),
      priceRating: new FormControl(0.0, {validators: [Validators.required], nonNullable: true}),
      serviceRating: new FormControl(0.0, {validators: [Validators.required], nonNullable: true}),
      workingDays: new FormControl([], {validators: [Validators.required], nonNullable: true}),
      zipCode: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    }
  )
  message:string = "";
  constructor(private caregiverApiService: CaregiversApiService,private formBuilder: FormBuilder) {

  }
  ngOnInit(){
    this.getFromBack()
  }
  getFromBack(){
    this.caregiverApiService.get().then(res => {
      this.message = res.data
      console.log(res.data)
    })
    console.log(this.form.value)
  }
}
