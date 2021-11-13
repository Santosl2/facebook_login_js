import axios from "axios";

class Facebook {
  /**
   *
   * @param {string} code
   * @returns access_token
   */

  async getAcessToken(code) {
    const { data } = await axios({
      url: "https://graph.facebook.com/v4.0/oauth/access_token",
      method: "get",
      params: {
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_APP_SECRET,
        redirect_uri: "https://localhost:3333/facebook/auth",
        code,
      },
    });

    if (!data) {
      throw new Error("Ooopss, missing token.");
    }

    return data.access_token;
  }

  /**
   *
   * @param {string} token
   * @returns user data
   */

  async getFacebookData(token) {
    const { data } = await axios({
      url: "https://graph.facebook.com/me",
      method: "get",
      params: {
        fields: ["id", "email", "first_name", "last_name"].join(","),
        access_token: token,
      },
    });

    if (!data) {
      throw new Error("Ooopss, missing data.");
    }

    return data;
  }
}

export { Facebook };
