import {Injectable} from '@angular/core';
import axios, {AxiosInstance} from 'axios';
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor(private _snackBar: MatSnackBar) {
    }
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            horizontalPosition: "center",
            verticalPosition: "top",
        });
    }
}
