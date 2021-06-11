import { getCookie, setCookie } from "./cookies";
export default class AuthClient {
  constructor() {
    this.baseURL = "http://localhost:3000";
  }

  // Callback params (user, error)
  signIn(email, password, callback) {
    fetch(`${this.baseURL}/users/signin`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        return res.json().then((resJson) => {
          return { data: resJson, status: res.status, ok: res.ok };
        });
      })
      .then((result) => {
        // RESULT -> { data, error, status, ok }
        if (result.ok && result.status == 200) {
          const { token, user } = result.data;
          this.saveAuthToken(token);
          callback(user, null);
        } else {
          callback(
            null,
            new Error(`Code: ${result.status} - ${result.data.message}`)
          );
        }
      })
      .catch((err) => {
        callback(null, err);
      });
  }

  saveAuthToken(token) {
    // localStorage.setItem("authToken", token);
    setCookie("authToken", token, 30);
  }

  retreiveAuthToken() {
    // return localStorage.getitem("authToken");
    return getCookie("authToken");
  }
}
