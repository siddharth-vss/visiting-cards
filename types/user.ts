export interface User {
  email: string;
  test:string;
  cards :  Number;
  password: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthUser {
  _id: string;
  email: string;
  name: string;
}