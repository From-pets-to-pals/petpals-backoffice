import {Injectable} from '@angular/core';
import axios, {AxiosInstance} from 'axios';
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class GeolocApiService {

    private readonly _instance:AxiosInstance
    constructor() {
        this._instance = axios.create({
            baseURL:environment.geolocApi.url,
            withCredentials: false,
            })
    }
    async get(coords: any) {
        return await (await this._instance.get(`${coords.latitude},${coords.longitude}/1/km`, {withCredentials: false})).data;
    }
    async getWithName(name: string) {
        return await (await this._instance.get(`hello/${name}`)).data;
    }
}
