$(document).ready(function() {
  // Getting references to our form and input
  var signUpButton = $(".signup");
  var usernameInput = $("input#username-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  var repeatPasswordInput = $("input#repeat-password-input");
  var repeatEmailInput = $("input#repeat-email-input");
  // When the signup button is clicked, we validate the email and password are not blank
  signUpButton.on("click", function(event) {
    // Replace all alerts with modals
    if (usernameInput.length < 6) {
      return alert("Username must be at least 6 characters long");
    }

    if (emailInput.val().trim() !== repeatEmailInput.val().trim()) {
      return alert("Emails don't match");
    }

    if (passwordInput.val().trim() !== repeatPasswordInput.val().trim()) {
      return alert("Passwordss don't match");
    }

    var userData = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.email || !userData.password) {
      return alert("Please don't leave fields blank");
    }

    // If we have an email and password, run the signUpUser function
    signUpUser(userData.username, userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
    usernameInput.val("");
    repeatPasswordInput.val("");
    repeatEmailInput.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(username, email, password) {
    $.post("/users/signup", {
      username: username,
      email: email,
      password: password
    }).then(function(data) {
      if (data.duplicateUser) {
        // Replace with Modal
        alert("Sorry, that username has been taken");
      } else {
        window.location = data.redirect;
      }
    }).catch(function(err) {
      console.log(err);
    });
  }

});
