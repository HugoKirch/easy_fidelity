'use strict'

$(document).ready(function() {
    $(".switcher").on('click', function() {
        if($(this).hasClass("vendorMode")) {
            $(this).removeClass("vendorMode");
            $(this).addClass("adminMode");
            $(this).text("Mode vendeur");
            $("#admin_ui").show();
            $("#vendor_ui").hide();
        }
        else if ($(this).hasClass("adminMode")) {
            $(this).removeClass("adminMode");
            $(this).addClass("vendorMode");
            $(this).text("Mode admin");
            $("#admin_ui").hide();
            $("#vendor_ui").show();
        }
    })

    $("#admin_search").submit(function(event) {
        event.preventDefault()
        let mail = $('#admin_email').val();
        console.log(mail);
        $.ajax({
            url: '/api/vendor/getUser/email/' + mail,
            type: 'GET',
            success: function(data) {
                console.log(data);
                localStorage.setItem('user_id', data._id);
                $("#admin_lastname").text("Nom: " + data.lastname);
                $("#admin_firstname").text("Prénom: " + data.firstname);
                $("#admin_email").text("Mail: " + data.mail);
                $("#admin_points").text("Points: " + data.points);
                $("#admin_phone").text("Téléphone: " + data.phone);
                $("#admin_role").text("Rôle: " + data.role);
                $("#admin_created_at").text("Créé le: " + data.created);
                $("#admin_result").show();
                $("#admin_search").hide();
            },
            error: function(err) {
                window.alert("Erreur: " + err.responseJSON.message)
            }
        })
    })

    $("#admin_btn_cancel").on('click', function() {
        $("#admin_result").hide();
        $("#admin_search").show();
        localStorage.removeItem('user_id');
    })

    $("#admin_btn_admin").on('click', function() {
        let user_id = localStorage.getItem('user_id');
        $.ajax({
            url: '/api/admin/changeRole',
            type: 'PUT',
            data: {
                _id: user_id,
                role: "admin"
            },
            success: function(data) {
                window.alert(data.message);
                $("#admin_result").hide();
                $("#admin_search").show();
                localStorage.removeItem('user_id');
            },
            error: function(err) {
                window.alert("Erreur: " + err.responseJSON.message)
            }
        })
    })

    $("#admin_btn_user").on('click', function() {
        let user_id = localStorage.getItem('user_id');
        $.ajax({
            url: '/api/admin/changeRole',
            type: 'PUT',
            data: {
                _id: user_id,
                role: "user"
            },
            success: function(data) {
                window.alert(data.message);
                $("#admin_result").hide();
                $("#admin_search").show();
                localStorage.removeItem('user_id');
            },
            error: function(err) {
                window.alert("Erreur: " + err.responseJSON.message)
            }
        })
    })

    $("#admin_btn_vendor").on('click', function() {
        let user_id = localStorage.getItem('user_id');
        $.ajax({
            url: '/api/admin/changeRole',
            type: 'PUT',
            data: {
                _id: user_id,
                role: "vendor"
            },
            success: function(data) {
                window.alert(data.message);
                $("#admin_result").hide();
                $("#admin_search").show();
                localStorage.removeItem('user_id');
            },
            error: function(err) {
                window.alert("Erreur: " + err.responseJSON.message)
            }
        })
    })

    $("#admin_btn_delete").on('click', function() {
        let user_id = localStorage.getItem('user_id');
        $.ajax({
            url: '/api/admin/deleteUser',
            type: 'DELETE',
            data: {
                _id: user_id
            },
            success: function(data) {
                window.alert(data.message);
                $("#admin_result").hide();
                $("#admin_search").show();
                localStorage.removeItem('user_id');
            },
            error: function(err) {
                window.alert("Erreur: " + err.responseJSON.message)
            }
        })
    })
})