export interface IAutorizationRequestData {
  email: string;
  password: string;
}

export interface IAutorizationResponse {
  succes: boolean;
  data: {
    token: string;
    expiresIn: number;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      role: string;
    };
  };
}
