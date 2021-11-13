import { Router } from "express";
import * as queryString from "query-string";
import { Facebook } from "../api/Facebook.js";

const fbRoutes = Router();

fbRoutes.get("/facebook", (Request, Response) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.FACEBOOK_APP_ID,
    redirect_uri: "https://localhost:3333/facebook/auth",
    scope: ["email", "user_friends"].join(","), // comma seperated string
    response_type: "code",
    auth_type: "rerequest",
    display: "popup",
  });

  const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
  Response.send(`<a href="${facebookLoginUrl}">Login With Facebook</a>`).status(
    200
  );
});

fbRoutes.get("/facebook/auth", async (Request, Response) => {
  const { code } = Request.query;

  const facebookLogin = new Facebook();

  const token = await facebookLogin.getAcessToken(code);
  const { first_name, last_name } = await facebookLogin.getFacebookData(token);

  Response.send(`Welcome ${first_name} ${last_name}`).status(200);
});

export { fbRoutes };
