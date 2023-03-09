$(document).ready(function() {
    $("#login_form").submit(function(event) {
        event.preventDefault();
        let $submitBtn = $("#submit_btn")
        $submitBtn.attr("aria-busy", "true");
        let user = {
            email: $('#email').val(),
            password: $('#password').val()
        };
        console.log(user)
        $.ajax({
            url: '/api/auth/sign_in',
            type: 'POST',
            data: user,
            success: function(data) {
                console.log(data);
                $submitBtn.attr("aria-busy", "false");
                window.location.href = "/";
            },
            error: function(err) {
                $submitBtn.attr("aria-busy", "false");
                window.alert("Erreur: " + err.responseJSON.message)
                console.log(err);
            }
        });
    });
});