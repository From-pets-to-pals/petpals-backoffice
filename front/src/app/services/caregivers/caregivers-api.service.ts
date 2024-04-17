import { Injectable } from '@angular/core';
import axios, {AxiosInstance} from 'axios';
import {environment} from "../../environments/environment.development";
import {Caregiver} from "../../models/interfaces/caregiver";

@Injectable({
  providedIn: 'root'
})
export class CaregiversApiService {

  private readonly _instance:AxiosInstance
  constructor() {
    this._instance = axios.create({
      baseURL:environment.caregivers.url,
      headers: {
        'API-KEY': environment.caregivers.apiKey
      }})
  }
  createCaregiver(caregiver : Caregiver) {
    return this._instance.post("caregivers/create", caregiver);
  }
  get() {
    return this._instance.get("hello");
  }

}
