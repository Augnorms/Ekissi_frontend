type Occupation = {
  nameofcompany: string;
  startdate: string;
  enddate: string;
  position: string;
};

export type UserDetails = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: string;
  dateofbirth: string;
  placeofbirth: string;
  occupation: Occupation[]; // Array of Occupation objects
  nationality: string;
  phonenumber: string;
  mothersname: string;
  fathersname: string;
  maritalstatus: string;
  numberofchildren: number;
  primaryeducation: string;
  secondaryeducation: string;
  tertiaryeducation: string;
  hometown: string;
};
