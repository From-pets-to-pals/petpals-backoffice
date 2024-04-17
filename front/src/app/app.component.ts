import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CreateCaregiverComponent} from "./components/create-caregiver/create-caregiver.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreateCaregiverComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PetPals';

  constructor() {
  }
}
