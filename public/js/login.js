$(document).ready(function () {
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        const userObj = {
            username: $("#username").val(),
            password: $("#password").val()
        }
        $.ajax({
            url: "/api/login",
            method: "POST",
            data: userObj
        }).done(function (data) {
            location.href = "/"
        }).fail(function (err) {
            console.log(err);
            $("#errorSpan").text("Incorrect login info.")
        })
    })
})