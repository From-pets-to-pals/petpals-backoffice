import dayjs from "dayjs";

export const templates = {
    regex : {
        icadIdentifier : "^(250)(26|22)\\d{10}$"
    },
    format : {
        date : "YYYY-MM-DD"
    }
}

export function formatDate (date: Date)  {
    if(date === null){
        return null;
    }
    return dayjs(date).format("YYYY-MM-DD")
}