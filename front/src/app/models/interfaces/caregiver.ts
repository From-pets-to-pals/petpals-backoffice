import {FormControl} from "@angular/forms";

export interface Caregiver {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string,
  city: string,
  zipCode: string;
  country: string;
  workingDays: string[];
  palsHandled: string[];
  homeService: boolean;
  appointmentDuration: number;
  caregiverType: string;
  isSubscribed: boolean;
  serviceRating: number;
  priceRating: number
}


export interface CreateCaregiverForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  address: FormControl<string>,
  city: FormControl<string>,
  zipCode: FormControl<string>;
  country: FormControl<string>;
  workingDays: FormControl<string[]>;
  palsHandled: FormControl<string[]>;
  homeService: FormControl<boolean>;
  appointmentDuration: FormControl<number>;
  caregiverType: FormControl<string>;
  isSubscribed: FormControl<boolean>;
  serviceRating: FormControl<number>;
  priceRating: FormControl<number>
}
