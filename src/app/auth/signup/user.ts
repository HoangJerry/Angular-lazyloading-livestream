export class User {
  constructor(
    public userEmail: string,
    public password: string,
    public confirmPassword: string,
    public donationAmount: number,
    public stripeToken: string,
    public UserPrefrences: any,
  ) {}
}
