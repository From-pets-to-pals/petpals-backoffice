const options = {
  caregiverType : [
    {
      label:"Groomer",
      value:"GROOMER"
    },
    {
      label:"Éducateur",
      value:"TRAINER"
    },
    {
      label:"Vétérinaire",
      value:"VET"
    },
  ]
, days : [
    {
      label:"Lundi",
      value:"MONDAY"
    },
    {
      label:"Mardi",
      value:"TUESDAY"
    },
    {
      label:"Mercredi",
      value:"WEDNESDAY"
    },
    {
      label:"Jeudi",
      value:"THURSDAY"
    },
    {
      label:"Vendredi",
      value:"FRIDAY"
    },
    {
      label:"Samedi",
      value:"SATURDAY"
    },
    {
      label:"Dimanche",
      value:"SUNDAY"
    }
  ],
    palsHandled:[
        {
            label:"Chiens",
            value:"DOG"
        },
        {
            label:"Chat",
            value:"CAT"
        },
        {
            label:"Furrets",
            value:"FERRET"
        },
        {
            label:"NAC",
            value:"NAC"
        },
    ],
    homeService:[
        {
            label:"Oui",
            value:true
        },
        {
            label:"Non",
            value:false
        },
    ]
}

export default options;
