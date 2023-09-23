export class User {
  private readonly id: string;
  private name: string;
  private readonly email: string;
  private password: string;

  constructor(user: {
    password: string;
    name: string;
    id: string;
    email: string;
  }) {
    Object.assign(this, user);
  }

  properties() {
    return {
      email: this.email,
      name: this.name,
      id: this.id,
      password: this.password,
    };
  }
}
