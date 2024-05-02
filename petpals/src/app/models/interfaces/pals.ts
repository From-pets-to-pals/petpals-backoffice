export interface Pal {
    palIdentityInformation: PalIdentityInformation;
    palMedicalInformation: PalMedicalInformation;
    palMeasurement: PalMeasurement;
}

export interface PalIdentityInformation {
    name: string;
    shortName: string,
    birthDate: Date,
    isMale: boolean,
    specie: string,
    breed: string,
    icadIdentifier: string;
    hasPassport: boolean
}

export interface PalMedicalInformation {
    isVaccinated: boolean;
    medicalHistory: string[];
    nextVaccine: Date | null;
    nextPlannedVetApp: Date | null;
    isSterilized: boolean;
}

export interface PalMeasurement {
    weight: number;
    height: number;
}
