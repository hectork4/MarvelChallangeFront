export interface User {
  username: string;
  password: string;
}

export interface RegisterUser extends User {
  confirmPassword: string;
}
