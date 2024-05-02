import {Component} from '@angular/core';
import {GeolocApiService} from "../../services/geoloc/geoloc-api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  location = ""
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
  })})

  constructor(private geolocApiService: GeolocApiService) {
    this.success = this.success.bind(this);
  }
  options = {
    enableHighAccuracy: true,
    timeout: 2000,
    maximumAge: 0,
  };

  success(pos: any) {
    const crd = pos.coords;
    this.geolocApiService.get(crd).then(res => {
      this.location = `${res.lat}_${res.lng}_${res.postal_code.substring(0,5)}_${res.country_code}`
      this.form.get('location')?.setValue(this.location)
    })
  }

  error(err: any) {
    console.log(`ERROR(${err.code}): ${err.message}`);
  }

  ngOnInit(){
    console.log("??")
    window.navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
    console.log(window.navigator.userAgent)
  }


}
