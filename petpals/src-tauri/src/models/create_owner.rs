
pub mod owners_create {
    use serde::{Deserialize, Serialize};
    use crate::models::species::species::Species;

    #[derive(Debug, Serialize,Deserialize,Clone)]
    #[serde(rename_all(deserialize="camelCase", serialize="camelCase"))]
    pub struct NewOwner {
        username: String,
        email: String,
        device_id: String,
        location: String,
        pals: Vec<AddPal>
    }

    #[derive(Debug, Serialize,Deserialize,Clone)]
    #[serde(rename_all(deserialize="camelCase", serialize="camelCase"))]
    pub struct AddPal {
        pal_identity_information: PalIdentityInformation,
        pal_medical_information: PalMedicalInformation,
        pal_measurement: PalMeasurement
    }

    #[derive(Debug, Serialize,Deserialize,Clone)]
    #[serde(rename_all(deserialize="camelCase", serialize="camelCase"))]
    pub struct PalIdentityInformation {
        name: String,
        shortname: Option<String>,
        birth_date: Option<String>,
        is_male: bool,
        specie: Species,
        breed: String,
        icad_identifier: String,
        has_passport: bool
    }
    #[derive(Debug, Serialize,Deserialize,Clone)]
    #[serde(rename_all(deserialize="camelCase", serialize="camelCase"))]
    pub struct PalMedicalInformation {
        is_vaccinated: bool,
        medical_history: Vec<String>,
        next_vaccine: Option<String>,
        next_planned_vet_app: Option<String>,
        is_sterilized: bool
    }
    #[derive(Debug, Serialize,Deserialize,Clone)]
    #[serde(rename_all(deserialize="camelCase", serialize="camelCase"))]
    pub struct PalMeasurement {
        weight: f32,
        height: f32
    }
}



