import {RouterModule, Routes} from '@angular/router';
import {CreateCaregiverComponent} from "./components/create-caregiver/create-caregiver.component";
import {TauriComponent} from "./components/tauri/tauri.component";
import {isTauriGuard} from "./guards/is-tauri-guard";
import {NgModule} from "@angular/core";
import {CreateOwnerComponent} from "./components/create-owner/create-owner.component";
import {PrivacyComponent} from "./components/privacy/privacy.component";
import {MapDisplayComponent} from "./components/map-display/map-display.component";
import {AuthOwnerComponent} from "./components/auth-owner/auth-owner.component";
import {RegisterMenuComponent} from "./components/auth-menu/register-menu.component";

export const routes: Routes = [
	{path: '', component: MapDisplayComponent},
	{ path: 'privacy', component: PrivacyComponent },
	{ path: 'register-menu', component: RegisterMenuComponent,
		children: [
			{path: 'create-caregiver', component: CreateCaregiverComponent},
			{path: 'create-owner', component: CreateOwnerComponent}
		]
	},
	{ path: 'auth-menu', component: RegisterMenuComponent },

// @ts-ignore
	{path: 'tauri', component: TauriComponent, canActivate: [isTauriGuard]}
];
@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule],
})
export class PagesRoutingModule {
}