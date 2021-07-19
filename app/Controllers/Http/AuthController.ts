import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Logger from "@ioc:Adonis/Core/Logger";

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    try {
      const token = await auth.use("api").attempt(email, password, {
        expiresIn: "10 days",
      });

      Logger.info({ user: auth.user.id }, "User login successfully");
      return token.toJSON();
    } catch (error) {
      Logger.error({ err: new Error(error) }, "User login failed");
      return error.message;
    }
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
    Logger.info({ user: user.id }, "User register successfully");

    try {
      const token = await auth.use("api").attempt(email, password, {
        expiresIn: "10 days",
      });

      Logger.info({ user: user.id }, "User login successfully");
      return token.toJSON();
    } catch (error) {
      Logger.error({ err: new Error(error) }, "User register failed");
      return error.message;
    }
  }
}
