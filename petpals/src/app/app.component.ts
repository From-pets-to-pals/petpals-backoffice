import {afterRender, AfterRenderPhase, Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CreateCaregiverComponent} from "./components/create-caregiver/create-caregiver.component";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {appWindow} from "@tauri-apps/api/window";
import {NgIf} from "@angular/common";
import {initFlowbite} from 'flowbite';
import titles from "./models/titles";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, CreateCaregiverComponent, MatButton, NgIf, RouterLink],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = titles.home;
	appWindow: Window = window;

	ngOnInit(): void {
		initFlowbite();
	}
	
	constructor(public dialog: MatDialog) {
		afterRender(() => {
			// @ts-ignore
			if (this.appWindow.__TAURI__) {
				appWindow.setTitle(titles.home)
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

