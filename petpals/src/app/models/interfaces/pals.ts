export interface Pal {
    palIdentityInformation: PalIdentityInformation;
    palMedicalInformation: PalMedicalInformation;
    palMeasurement: PalMeasurement;
}

export interface PalIdentityInformation {
    name: string;
    shortname: string | null,
    birthDate: string | null,
    isMale: boolean,
    specie: string,
    breed: string,
    icadIdentifier: string;
    hasPassport: boolean
}

export interface PalMedicalInformation {
    isVaccinated: boolean;
    medicalHistory: string[];
    nextVaccine: string | null;
    nextPlannedVetApp: string | null;
    isSterilized: boolean;
}

export interface PalMeasurement {
    weight: number;
    height: number;
}
