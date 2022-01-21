export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  login: string;
  error: string | null;
}
