function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

class AuthClient {
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
      .then(res => {
        return res.json().then((resJson) => {
          return { data: resJson, status: res.status, ok: res.ok };
        });
      })
      .then((result) => {
        // RESULT -> { data, error, status, ok }
        if (result.ok && result.status == 200) {
          const { token, user } = result.data
          this.saveAuthToken(token);
          callback(user, null);
        } else {
          callback(null, new Error(`Code: ${result.status} - ${result.data.message}`));
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

window.onload = () => {
  const loginForm = document.querySelector("#loginform");
  const errorText = document.querySelector("#errorlabel");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.submitter.id === "submitWithEmailAndPwBtn") {
      console.log("SUBMITTING");
      const email = document.querySelector(".emailField").value;
      const password = document.querySelector(".passwordField").value;
      const auth = new AuthClient();
      auth.signIn(email, password, (user, error) => {
        if (error) {
          console.log(`error signing in..`, error);
          errorText.innerHTML = error.message;
        }
        if (user) {
          console.log(`Got user`, user);
          
        }
      });
    } else if (e.submitter.id === "submitAsGuestBtn") {
    }
  });
};
