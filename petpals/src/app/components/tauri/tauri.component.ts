import {Component} from '@angular/core';
import {DialogElementsExampleDialog} from "../../renders/dialogs/simple-dialog";
import {invoke} from "@tauri-apps/api/tauri";
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
	selector: 'app-tauri',
	standalone: true,
	imports: [
		MatButton
	],
	templateUrl: './tauri.component.html',
	styleUrl: './tauri.component.css'
})
export class TauriComponent {
	
	openDialog(display: string, title: string) {
		this.dialog.open(DialogElementsExampleDialog, {data: {message: display, title: title}});
	}
	
	greet(name: string): void {
		// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
		if(window.__TAURI__){
			invoke<string>("greet", {name}).then((text: string) => {
				this.openDialog(text, "Welcome aboard");
			});
			
		} else {
			this.openDialog("Unable to do this from browser", "Out of scope operation")
		}
	}
	
	constructor(public dialog: MatDialog) {
	}
}
