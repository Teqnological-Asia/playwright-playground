export interface ILoginResponse {
  access_token: string;
  status: number;
}

export interface ILoginRequest {
  id: {
    value: string;
  };
  password: {
    value: string;
  };
}

export interface IUser {
  name: string;
  dob: string;
  age: number;
}

export interface IAuthorizationResponse extends IUser {
  status: number;
}
