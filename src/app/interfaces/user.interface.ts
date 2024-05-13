export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  gender: string;
  address: string;
  dateOfBirth: string;
  phone: string;
  imageUrl: string;
}

export interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface Response {
  info: Info;
  results: any[];
}
