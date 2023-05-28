import jwt  from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { User } from "../entity/User";
import {
  getUsers,
  createUser,
  getUser,
  getUserByEmail
} from "../repositories/user.repository";
import { UserLoginFormValues } from "../models/UserModels";
import { JWT_SECRET_KEY } from "../config/jwt";

@Route("users")
@Tags("User")
export default class UserController {
  @Get("/")
  public async getUsers(): Promise<Array<User>> {
    return getUsers();
  }

  @Post("/")
  public async createUser(@Body() body: User): Promise<User> {
    return createUser(body);
  }

  @Get("/:id")
  public async getUser(@Path() id: string): Promise<User | null> {
    return getUser(Number(id));
  }

  @Post("/register")
  public async registerUser(@Body() body: User){
    let password = body.password;
    if (password) {
        password = bcrypt.hashSync(password, 10);
    }

    let userInfo = {
      email: body.email,
      password: password,
      firstName: body.firstName,
      lastName: body.lastName,
      role: body.role,
      organization: body.organization,
      staffID: body.staffID
    };
    return createUser(userInfo);
  }

  @Post("/login")
  public async loginUser(@Body() body: UserLoginFormValues){
    let email = body.email;
    let password = body.password;

    const user = await getUserByEmail(email);

    if (user != null){
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ sub: user.id }, JWT_SECRET_KEY);
        return { id:user.id, email:user.email, role: user.role, token: token };
    }
    }else{
      return {id: "", email: "", token: ""};
    }
  }
}
