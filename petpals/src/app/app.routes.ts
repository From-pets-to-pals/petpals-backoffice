import { Routes } from '@angular/router';
import {CreateCaregiverComponent} from "./components/create-caregiver/create-caregiver.component";
import {TauriComponent} from "./components/tauri/tauri.component";
import {isTauriGuard} from "./is-tauri-guard";

export const routes: Routes = [
	{path: 'create-caregiver', component: CreateCaregiverComponent},
// @ts-ignore
	{path: 'tauri', component: TauriComponent, canActivate: [isTauriGuard]}
];
