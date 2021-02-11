import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    const token = await auth.use("api").attempt(email, password, {
      expiresIn: "10 days",
    });
    return token.toJSON();
  }

  public async register({ request, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    const name = request.input("name");

    /**
     * Create a new user
     */
    const user = new User();
    user.email = email;
    user.password = password;
    user.name = name;
    await user.save();

    const token = await auth.use("api").login(user, {
      expiresIn: "10 days",
    });
    return token.toJSON();
  }
}
