$(document).ready(function () {
    // GLOBAL VARIABLES
    // ======================================================================================
    const usernameInput = $("#username");
    const passwordInput = $("#password");
    const passwordInputConfirm = $("#passwordConfirm")

    // EVENT LISTENERS
    // ======================================================================================
    $("#registerForm").on("submit", handleFormSubmit);


    // FUNCTIONS
    // ======================================================================================
    function handleFormSubmit(event) {
        event.preventDefault();
        if (!usernameInput.val().trim()) {
            return $("#errorSpan").text("Please enter a username");
        }
        if (!passwordInput.val().trim()) {
            return $("#errorSpan").text("Please enter a password.");
        }
        if (passwordInput.val().trim() != passwordInputConfirm.val().trim()) {
            return $("#errorSpan").text("Passwords don't match.")
        }

        const newUserObj = {
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim(),
        };
        submitUser(newUserObj);
    }

    function submitUser(newUserObj) {
        $.ajax({
            url: "/api/register",
            method: "POST",
            data: newUserObj
        }).done(function (data) {
            location.href = "/login"
        }).fail(function (err) {
            console.log(err);
            $("#errorSpan").text("Something went wrong.")
        })
    }
});