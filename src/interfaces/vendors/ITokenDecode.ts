export interface ITokenDecode {
  id: number;
  userName: string;
  name: string;
  surname: string;
  roleNames: string[];
  iat: number;
  exp: number;
}
