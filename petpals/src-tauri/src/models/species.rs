
pub mod species {
use serde::{Deserialize, Serialize};
    #[derive(Clone,Serialize,Deserialize,Debug)]
    pub struct Species (
        String
    );

    impl Species {
        const DOG:&'static str  = "DOG";
        const CAT:&'static str  = "CAT";
        const FERRET:&'static str  = "FERRET";
        const NAC:&'static str  = "NAC";

    }
}