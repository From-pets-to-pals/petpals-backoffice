import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CreateCaregiverComponent} from "./components/create-caregiver/create-caregiver.component";
import { invoke } from "@tauri-apps/api/tauri";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreateCaregiverComponent, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PetPals';
  greetingMessage = "";
  
  greet( name: string): void {
    
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    invoke<string>("greet", { name }).then((text:string) => {
      this.greetingMessage = text;
    });
  }
  constructor() {
  }
}
