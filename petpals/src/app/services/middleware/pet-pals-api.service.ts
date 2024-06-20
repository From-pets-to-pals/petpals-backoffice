import { Injectable } from '@angular/core';
import axios, {AxiosInstance} from 'axios';
import {environment} from "../../environments/environment";
import {Caregiver} from "../../models/interfaces/caregiver";
import {CreateOwner} from "../../models/interfaces/owner";

@Injectable({
  providedIn: 'root'
})
export class PetPalsApiService {

  private readonly _instance:AxiosInstance
  constructor() {
    this._instance = axios.create({
      baseURL:environment.api.url,
      headers: {
        'API-KEY': environment.api.apiKey
      }})
  }
  async createCaregiver(caregiver: Caregiver) {
    return await (await this._instance.post("caregivers", caregiver)).data;
  }
  async createOwner(owner: CreateOwner) {
    return await (await this._instance.post("owners", owner)).data;
  }
  async get() {
    return await (await this._instance.get("hello", {withCredentials: false})).data;
  }

  async getCaregiverOptions() {
    return await (await this._instance.get("options/create/caregiver", )).data;
  }
  async getOwnerOptions() {
    return await (await this._instance.get("options/create/owner", )).data;
  }
}