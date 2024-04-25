pub mod tauri_response {
    use serde::{Deserialize, Serialize};

    #[derive(Clone,Serialize,Deserialize,Debug)]
    #[serde(rename_all(deserialize="camelCase", serialize="camelCase"))]
    pub struct TauriResponse {
        data : String,
        status_code : u16,
    }


    impl TauriResponse {
        pub fn new(status_code : u16 , data : String
               ) -> TauriResponse {
            return TauriResponse {
                data: data, status_code: status_code
            };
        }
    }
}