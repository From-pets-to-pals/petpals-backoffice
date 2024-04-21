import {afterRender, AfterRenderPhase, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CreateCaregiverComponent} from "./components/create-caregiver/create-caregiver.component";
import {invoke} from "@tauri-apps/api/tauri";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {appWindow} from "@tauri-apps/api/window";
import {DialogElementsExampleDialog} from "./renders/dialogs/simple-dialog";
import {NgIf} from "@angular/common";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, CreateCaregiverComponent, MatButton, NgIf],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'PetPals';
	greetingMessage = "";
	appWindow: Window = window;
	
	openDialog(display: string) {
		this.dialog.open(DialogElementsExampleDialog, {data: {message: display, title: "Welcome"}});
	}
	
	greet(name: string): void {
		// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
		invoke<string>("greet", {name}).then((text: string) => {
			this.openDialog(text);
		});
	}
	
	constructor(public dialog: MatDialog) {
		afterRender(() => {
			// @ts-ignore
			if (this.appWindow.__TAURI__) {
				appWindow.setTitle("Accueil")
				// @ts-ignore
				document
					.getElementById('titlebar-minimize')
					.addEventListener('click', () => appWindow.minimize())
				// @ts-ignore
				document
					.getElementById('titlebar-maximize')
					.addEventListener('click', () => appWindow.toggleMaximize())
				// @ts-ignore
				document
					.getElementById('titlebar-close')
					.addEventListener('click', () => appWindow.close())
			}
		}, {phase: AfterRenderPhase.Write});
	}
}

