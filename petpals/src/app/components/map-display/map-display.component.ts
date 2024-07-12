
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {Observable} from "rxjs";
import {Class, icon} from "leaflet";
import {LocationComponent} from "../location/location.component";
import {ReactiveFormsModule} from "@angular/forms";



@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  standalone: true,
  imports: [
    LocationComponent,
    ReactiveFormsModule
  ],
  styleUrls: ['./map-display.component.scss']
})
export class MapDisplayComponent implements OnInit {
  map!: L.Map;
  locator!: Observable<any>
  userMarker!: L.Marker
  userCoords= {"latitude": 0, "longitude": 0}
  USER_PIN = "/assets/user-position.png"
  LOCATION_PIN = "/assets/location-pin.png"

  deviceId: string = ""
  location: string = ""

  editMode: Boolean = false

  toDisplayMarkers = [
    {
      name: "Cimetierre du père lachaise",
      latitude: 48.86159213435838,
      longitude: 2.3942956739213312
    }, {
      name: "Square de la roquette",
      latitude: 48.85958000305744,
      longitude: 2.3844003980953667
    }, {
      name: "Place des vosges",
      latitude: 48.85559960681,
      longitude: 2.36572994035044
    }
  ]

  constructor(

  ) {
  }

  markerOptions = {
    icon: L.icon({
      iconUrl: '',
      iconSize: [25, 25], // size of the icon
      iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
      popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
      shadowSize: [41, 41]
    }),
    opacity: 1,
    draggable: false
  }



  ngOnInit(): void {
    this.initMap();

    this.drawNearMarkers()

    this.map.on('click', (e) => {
      this.getMouseClickCoordsAndOpenModal(e)
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  private updateUserCoords(latlng: any) {
    this.userCoords.latitude = latlng.latitude
    this.userCoords.longitude = latlng.longitude
    this.updateUserMarker()
  }

  private updateUserMarker() {
    this.userMarker.setLatLng([this.userCoords.latitude, this.userCoords.longitude])
  }

  private createMarker(iconPath: string, data: any) {
    const newOptions = Object.assign({}, this.markerOptions);
    newOptions.icon.options.iconUrl = iconPath
    return L.marker([data.latitude, data.longitude], newOptions).addTo(this.map).bindPopup(data.name)
  }

  private drawNearMarkers() {
    this.toDisplayMarkers.forEach((marker) => {
      this.createMarker(this.LOCATION_PIN, marker)
    })
  }

  private getMouseClickCoordsAndOpenModal(e: any) {
      var coord = e.latlng;
      var lat = coord.lat;
      var lng = coord.lng;
      var marker = L.marker([lat, lng]).addTo(this.map);

  }

  GetLocationData(something: string) {
    console.log(this.extractCoordinates(something))
    if(!this.userMarker) {
      this.userMarker = this.createMarker(this.USER_PIN,{
        latitude: this.userCoords.latitude,
        longitude: this.userCoords.longitude,
        name: "Vous êtes ici"
      })
    }
    this.updateUserCoords(
        this.extractCoordinates(something)
    )
  }

  extractCoordinates(text: string): { latitude: number, longitude: number } | null {
    const regex = /(\d+\.\d+)_(-?\d+\.\d+)/;
    const matches = text.match(regex);

    if (matches && matches.length === 3) {
      const latitude = parseFloat(matches[1]);
      const longitude = parseFloat(matches[2]);

      return { "latitude": latitude, "longitude": longitude };
    }
    return null;
  }


}
