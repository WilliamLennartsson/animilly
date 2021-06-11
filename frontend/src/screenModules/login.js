import AuthClient from "../auth/authClient.js";
window.onload = () => {
  const loginForm = document.querySelector("#loginform");
  const errorText = document.querySelector("#errorlabel");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (e.submitter.id === "submitWithEmailAndPwBtn") {
      console.log("SUBMITTING LOGIN REQUEST");

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
          const origin = window.location.origin;
          window.location = `${origin}/gallery.html`;
        }
      });
    } else if (e.submitter.id === "submitAsGuestBtn") {
      // TODO: Handle
    }
  });
};
