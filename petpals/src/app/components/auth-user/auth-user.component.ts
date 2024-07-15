import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {AppState, getToken, selectToken, updateToken} from "../../stores/app.state";
import {invoke} from "@tauri-apps/api/tauri";
import {Pal} from "../../models/interfaces/pals";
import {formatDate} from "../../models/menus/formatters";
import {CreateOwner} from "../../models/interfaces/owner";
import {PetpalsApiService} from "../../services/middleware/petpals-api.service";
import {ErrorService} from "../../services/error/error.service";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-user',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        MatInput
    ],
  templateUrl: './auth-user.component.html',
  styleUrl: './auth-user.component.css'
})
export class AuthUserComponent {

  constructor(
      private store: Store,
      private apiService: PetpalsApiService,
      private errorService: ErrorService,
      private router: Router,
  ) {}

  form = new FormGroup({
        password: new FormControl('', {validators: [Validators.required, Validators.minLength(3)], nonNullable: true}),
        email: new FormControl('', {validators: [Validators.required, Validators.email], nonNullable: true}),
      });

    authUser() {

        if (this.form.valid) {
            const ownerToCreate = this.mapUser()
            console.log(this.mapUser())
            if (!window.__TAURI__) {
                this.apiService.authOwner().then(res => {
                    this.store.dispatch(updateToken(res.data))
                    this.errorService.openSnackBar("Signed-in successfully", "Close")
                    this.router.navigate(['/home'])
                }).catch(err => {
                    console.log(err)
                    this.errorService.openSnackBar(` ${err.response.data}`, "Close")
                })
            } else {
                const createOwner = ownerToCreate
                invoke<string>("create_owner", {createOwner}).then((res: any) => {
                    this.store.dispatch(updateToken(res.data))
                    this.errorService.openSnackBar("Welcome aboard", "Ok")
                });
            }
        }
    }

    mapUser() {
        const user = {
            email: this.form.get('email')!.value,
            password: this.form.get('password')!.value
        }
        return user;
    }
}
