$(document).ready(function() {
    $.each($('details'), function(index, value) {
        console.log($(this))
        if ($(this).data('minpoints') <= points)
            $(this).attr("open", "true");
    })

    // Création du Qr code via l'id de l'utilisateur envoyé par ejs
    if (qrcode_str !== "") {
        console.log(qrcode_str)
        let size = $("article").width() / 1.5;
        console.log(size)
        new QRCode("qrcode", {
            text: qrcode_str,
            width: size,
            height: size,
        })
    }
    $("#logout_btn").click(function() {
        $.ajax({
            url: '/api/auth/logout',
            type: 'POST',
            success: function(data) {
                console.log(data);
                window.location.href = "/";
            },
            error: function(err) {
                window.alert("Erreur: " + err.responseJSON.message)
                console.log(err);
            }
        });
    });
})