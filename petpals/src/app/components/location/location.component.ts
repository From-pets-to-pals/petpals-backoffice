import {Component, EventEmitter, Output} from '@angular/core';
import {GeolocApiService} from "../../services/geoloc/geoloc-api.service";

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  location = ""
  @Output()
  updatedLocation = new EventEmitter<string>();
  constructor(private geolocApiService: GeolocApiService) {
    this.success = this.success.bind(this);
  }
  options = {
    enableHighAccuracy: true,
    timeout: 2000,
    maximumAge: 0,
  };

  success(pos: any) {
    const coordinates = pos.coords;
    this.geolocApiService.get(coordinates).then(res => {
      this.location = `${res.lat}_${res.lng}_${res.postal_code.substring(0,5)}_${res.country_code}`
      this.SendLocation()
    })
  }

  error(err: any) {
    console.log(`ERROR(${err.code}): ${err.message}`);
  }

  ngOnInit(){
    window.navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
  }



  SendLocation(){
    this.updatedLocation.emit(this.location)
  }
}
