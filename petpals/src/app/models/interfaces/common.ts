import {Breed, Specie} from "./pals";

export interface Country {
    code: string;
    name : string;
    number: string;
}

export interface CreateOwnerOptions {
    species : Specie[];
    dogBreeds: Breed[];
    catBreeds: Breed[];
    nacBreeds: Breed [];
    countries: Country[];
}