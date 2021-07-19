/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", "ForumsController.test");

Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");

  Route.group(() => {
    Route.resource("posts", "PostsController").apiOnly();
    Route.resource("forums", "ForumsController").apiOnly();
    Route.get("users/forums", "UsersController.forumsByUser");
    Route.get("users/posts", "UsersController.postsByUser");
  }).middleware("auth:api");
}).prefix("api");
