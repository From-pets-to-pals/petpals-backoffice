
pub mod caregivers_create {
    use serde::{Deserialize, Serialize};
    use crate::models::species::species::Species;

    #[derive(Debug, Serialize,Deserialize,Clone)]
    #[serde(rename_all(deserialize="camelCase", serialize="camelCase"))]
    pub struct CreateCaregiver {
        first_name: String,
        last_name: String,
        email: String,
        phone_number: String,
        address: String,
        city: String,
        zip_code: String,
        country: String,
        working_days: Vec<Days>,
        pals_handled: Vec<Species>,
        home_service: bool,
        appointment_duration: f32,
        caregiver_type: CaregiverTypes,
        is_subscribed: bool,
        service_rating: f32,
        price_rating: f32
    }

    #[derive(Clone,Serialize,Deserialize,Debug)]
    struct Days (
        String
    );

    impl Days {
        const MONDAY: &'static str = "MONDAY";
        const TUESDAY: &'static str = "TUESDAY";
        const WEDNESDAY:&'static str  = "WEDNESDAY";
        const THURSDAY:&'static str  = "THURSDAY";
        const FRIDAY:&'static str  = "FRIDAY";
        const SATURDAY:&'static str  = "SATURDAY";
        const SUNDAY:&'static str  = "SUNDAY";
    }




    #[derive(Clone,Serialize,Deserialize,Debug)]
    struct CaregiverTypes (
        String
    );

    impl CaregiverTypes {
        const GROOMERS:&'static str  = "GROOMERS";
        const TRAINERS:&'static str  = "TRAINERS";
        const VETS:&'static str  = "DOG";

    }
}



