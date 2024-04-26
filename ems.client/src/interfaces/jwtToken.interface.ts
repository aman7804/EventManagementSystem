export class JWTToken {
    exp: number;
  
    UserName: string;
  
    constructor(data?: JWTToken) {
      this.exp = data ? data.exp : 0;
      this.UserName = data ? data.UserName : "";
    }
  }