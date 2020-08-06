$(document).ready(function () {

    // VARIABLES
    // ==============================================
    let counter;
    let username;
    const button = $("#counterButton")
    const counterSpan = $("#counterSpan")
    const saveButton = $("#navbarI")

    // FUNCTIONS
    // ==============================================
    const iterateButton = () => {
        counter++;
        $(counterSpan).text(`Hugs: ${counter}`)
    }

    const readsession = () => {
        $.ajax('/readsessions').done(function (data) {
            if (data.user) {
                $("#navbarI").addClass("fas fa-save")
                counter = data.user.hugs
                username = data.user.username
                $(counterSpan).text(`Hugs: ${counter}`)
            } else {
                location.href = "/login"
            }
        })
    }

    const updateHugs = (event) => {
        event.preventDefault()
        const hugObj = {
            username: username,
            hugs: counter
        }
        $.ajax({
            url: "/api/save",
            method: "PUT",
            data: hugObj
        }).done(function (data) {
            
        }).fail(function (err) {
            location.reload();
        })
    }

    readsession()


    // EVENT LISTENERS
    // ==============================================
    $(button).click(iterateButton)
    $(saveButton).click(updateHugs)
})