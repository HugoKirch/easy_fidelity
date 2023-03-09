$(document).ready(function() {
    $("#show_password").on('click', function() {
        let $passwordField = $('#password');
        if ($passwordField.attr('type') === 'password') {
            $passwordField.attr('type', 'text');
        }
        else {
            $passwordField.attr('type', 'password');
        }
    });
    $("#register_form").submit(function(event) {
        event.preventDefault();
        let $submitBtn = $("#submit_btn")
        $submitBtn.attr("aria-busy", "true");
        let user = {
            email: $('#email').val(),
            password: $('#password').val(),
            firstname: $('#firstname').val(),
            lastname: $('#lastname').val(),
            phone: $('#phone').val()

        };
        console.log(user);
        $.ajax({
            url: '/api/auth/register',
            type: 'POST',
            data: user,
            success: function(data) {
                console.log(data);
                $submitBtn.attr("aria-busy", "false");
                window.location.href = '/register_checkMail?mail=' + data.email;
            },
            error: function(err) {
                $submitBtn.attr("aria-busy", "false");
                window.alert("Erreur: " + err.responseJSON.message)
                console.log(err);
            }
        });
    });
});

