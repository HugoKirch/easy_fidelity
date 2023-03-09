'use strict'

$(document).ready(function() {

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
    })

    //Visuel de la page de recherche utilisateur
    const scanner = new Html5QrcodeScanner('reader', {
        // Scanner will be initialized in DOM inside element with id of 'reader'
        qrbox: {
            width: 250,
            height: 250,
        },  // Sets dimensions of scanning box (set relative to reader element width)
        fps: 30, // Frames per second to attempt a scan
    });
    scanner.render(success, error);     // Starts scanner

    function success(result) {
        let regex = new RegExp("\"", "g")
        console.log(result)
        $.ajax({
            url: '/api/vendor/getUser/id/' + result.replace(regex, ""),
            type: 'GET',
            success: function(data) {
                localStorage.setItem('user_id', data._id);
                scanner.clear();
                localStorage.setItem('points', data.points);
                $('#available_points').text('Points disponibles: ' + data.points);
                $("#search").hide();
                $("#interface").show();
            },
            error: function(err) {
                window.alert("Erreur: " + err.responseJSON.message)
            }
        });
    }

    function error(err) {
        console.log(err);
        // Prints any errors to the console
    }

    $("#mail_search").submit(function(event) {
        event.preventDefault()
        let mail = $('#mail').val();
        $.ajax({
            url: '/api/vendor/getUser/email/' + mail,
            type: 'GET',
            success: function(data) {
                localStorage.setItem('user_id', data._id);
                scanner.clear();
                localStorage.setItem('points', data.points);
                $('#available_points').text('Points disponibles: ' + data.points);
                $("#search").hide();
                $("#interface").show();
            },
            error: function(err) {
                window.alert("Erreur: " + err.responseJSON.message)
            }
        })
    })

    //Visuel de la page ajout / retrait de points

    $("#add").submit(function(event) {
        event.preventDefault()
        let points = $('#add_points').val();
        let user_id = localStorage.getItem('user_id');
        $.ajax({
            url: '/api/vendor/addPoints',
            type: 'PUT',
            data: {
                _id: user_id,
                points: points
            },
            success: function(data) {
                console.log(data);
                window.alert("Points ajoutés avec succès");
                $("#add_points").val("");
                localStorage.clear();
                $("#interface").hide();
                $("#search").show();
                scanner.render(success, error);
            },
            error: function(err) {
                console.log(err);
                window.alert("Erreur: " + err.responseJSON.message)
            }
        })
    })

    $("#remove").submit(function(event) {
        event.preventDefault()
        let pts = 0;
        $(this).find('input').each(function() {
            if ($(this)[0].checked) {
                pts = $(this).val();
            }
        })
        if (pts > localStorage.getItem('points')) {
            window.alert("Pas assez de points");
            return;
        }
        $.ajax({
            url: '/api/vendor/removePoints',
            type: 'PUT',
            data: {
                _id: localStorage.getItem('user_id'),
                points: pts
            },
            success: function(data) {
                console.log(data);
                window.alert("Points retirés avec succès");
                localStorage.clear();
                $("#interface").hide();
                $("#search").show();
                scanner.render(success, error);
            },
            error: function(err) {
                console.log(err);
                window.alert("Erreur: " + err.responseJSON.message)
            }
        })
    })

    $("#cancel_btn").on('click', (function() {
        localStorage.clear();
        $("#interface").hide();
        $("#search").show();
        scanner.render(success, error);
    }))
})