import {RouterModule, Routes} from '@angular/router';
import {CreateCaregiverComponent} from "./components/create-caregiver/create-caregiver.component";
import {TauriComponent} from "./components/tauri/tauri.component";
import {isTauriGuard} from "./guards/is-tauri-guard";
import {NgModule} from "@angular/core";
import {LocationComponent} from "./components/location/location.component";

export const routes: Routes = [
	{path: 'create-caregiver', component: CreateCaregiverComponent},
	{path: 'create-owner', component: LocationComponent},

// @ts-ignore
	{path: 'tauri', component: TauriComponent, canActivate: [isTauriGuard]}
];
@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule],
})
export class PagesRoutingModule {
}