$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const usernameInput = $("input#username-input");
  const passwordInput = $("input#password-input");

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  const loginUser = (username, password) => {
    $.post("/users/login", {
      username: username,
      password: password
    })
    .then(data => window.location.replace(data))
    .catch(err => $("#password-feedback").text("Incorrect Username or Password"));
  }

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.username) {
      usernameInput.css("border", "solid 1px red");
      $("#username-feedback").text("Please enter a username");
      return;
    }

    if (!userData.password) {
      passwordInput.css("border", "solid 1px red");
      $("#password-feedback").text("Please enter a password");
      return;
    }


    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
  });

});
