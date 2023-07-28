export interface UserJwtPayload {
  username: string;
  role: number;
  exp?: number;
}
