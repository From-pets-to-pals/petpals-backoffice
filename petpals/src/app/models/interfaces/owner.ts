import {FormControl} from "@angular/forms";
import {Pal} from "./pals";

export interface CreateOwner {
    username: string;
    email: string;

    deviceId: string;
    location: string;
    pals: Pal[]
}



export interface CreateOwnerForm {
    username: FormControl<string>;
    deviceId: FormControl<string>;
    location: FormControl<string>;
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
