
// NIVO LIGHTBOX

$(".navbar-nav li a").on('click', function (event) {


    if ($(this).parents('.navbar-nav li').length) {
        $('.navbar-nav li .active').removeClass('active');
        $(this).closest('a').addClass('active');
    }
});
// on scroll adding the class active to  the closest section
$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var home = $("#home").position().top;
    var about = $("#about").position().top;
    var services = $("#service-section").position().top;
    var portfolio = $("#portfolio").position().top;
    var testimonials = $("#testimonials").position().top;
    var contact = $("#contact").position().top;
    if (scroll >= home - 150 && scroll < about - 150) {
        $('.navbar-nav li .active').removeClass('active');
        $('.navbar-nav li .home').addClass('active');
    }
    else if (scroll >= about - 150 && scroll < services - 150) {
        $('.navbar-nav li .active').removeClass('active');
        $('.navbar-nav li .about').addClass('active');
    }
    else if (scroll >= services - 150 && scroll < portfolio - 150) {
        $('.navbar-nav li .active').removeClass('active');
        $('.navbar-nav li .service').addClass('active');
    }
    else if (scroll >= portfolio - 150 && scroll < testimonials - 150) {
        $('.navbar-nav li .active').removeClass('active');
        $('.navbar-nav li .project').addClass('active');
    }
    else if (scroll >= testimonials - 150 && scroll < contact - 150) {
        $('.navbar-nav li .active').removeClass('active');
        $('.navbar-nav li .testimonials').addClass('active');
    }
    else if (scroll >= contact-150) {
        $('.navbar-nav li .active').removeClass('active');
        $('.navbar-nav li .contact').addClass('active');
    }
});

// HIDE MOBILE MENU AFTER CLIKING ON A LINK
$('.navbar-collapse a').click(function () {
    $(".navbar-collapse").collapse('hide');
});
$(document).ready(() => {
    $("#submitBtn").click((e) => {
        e.preventDefault();
        let stat = formValidation();
        let data = $('#contactForm').serialize();
        if (stat) {
            $("#submitBtn").prop('disabled', true);
            $("#submitBtn").css({
                color: 'black'
            });
            $.ajax({
                url: 'https://script.google.com/macros/s/AKfycbwRW4tqr14DmMW7aQ9Z7vRwHupXmItuy1qA3128xii5EEXIfg1ELLn0zG7iJQdyyg0HuQ/exec',
                method: 'POST',
                data: data,
                success: function (response) {
                    if (response.result == "success") {
                        $("#contactForm")[0].reset();
                        $("#form-submit-response").addClass('text-success');
                        $("#form-submit-response").text('Form Submitted Successfully');
                        $("#form-submit-response").show();
                        setTimeout(() => {
                            $("#form-submit-response").removeClass('text-success');
                            $("#form-submit-response").hide();
                            $("#submitBtn").prop('disabled', false);
                        }, 2000);
                    }
                    else {
                        $("#form-submit-response").addClass('text-danger');
                        $("#form-submit-response").text('Form not Submitted');
                        $("#form-submit-response").show();
                        setTimeout(() => {
                            $("#form-submit-response").removeClass('text-danger');
                            $("#form-submit-response").hide();
                            $("#submitBtn").prop('disabled', false);
                            $("#submitBtn").css({
                                color: '#fff'
                            });
                        }, 2000);
                    }
                },
                error: function (err) {
                    $("#form-submit-response").addClass('text-danger');
                    $("#form-submit-response").text('Form not Submitted');
                    $("#form-submit-response").show();
                    setTimeout(() => {
                        $("#form-submit-response").removeClass('text-danger');
                        $("#form-submit-response").hide();
                        $("#submitBtn").prop('disabled', false);
                        $("#submitBtn").css({
                            color: '#fff'
                        });
                    }, 2000);
                }
            })
        }
        else {

        }
    })

});
const formValidation = (() => {
    let nameFound = nameCheck();
    let numberFound = numberCheck();
    let emailFound = emailCheck();
    let messageFound = messageCheck();
    if (nameFound && numberFound && emailFound && messageFound) {
        return true;
    }
    else {
        return false;
    }
});
const messageCheck = (() => {
    let message = $("#message").val();
    message = message.replace(/  +/g, ' ');
    $("#message").val(message);
    var count = message.replace(/\s+/g, '').length;
    if (message.length == 0) {
        $('#messageErr').show();
        $("#messageErr").text("Please Enter the Message");
        return false;
    }
    else if (message.charCodeAt(0) == 32) {
        $('#messageErr').show();
        $("#messageErr").text("First letter not be a space");
        return false;
    }
    if (count > 12 && count < 250) {
        $('#messageErr').hide();
        return true;
    }
    else if (count < 12) {
        $('#messageErr').show();
        $("#messageErr").text("Minimum 12 characters needed");
        return false;
    }
    else if (count > 250) {
        $('#messageErr').show();
        $("#messageErr").text("Maximum 250 character allowed");
        return false;
    }
})

const emailCheck = (() => {
    let email = $('#email').val();
    filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email.length == 0) {
        $("#emailErr").show();
        $("#emailErr").text("Please enter the Email");
        return false;
    }
    else if (email.endsWith(" ")) {
        $("#emailErr").show();
        $("#emailErr").text("Last letter not be a space");
        return false;
    }
    else if (filter.test(email)) {
        $("#emailErr").hide();
        return true;
    }
    else {
        $("#emailErr").show();
        $("#emailErr").text("Enter the valid email address");
        return false;
    }
})
const numberCheck = (() => {
    let number = $("#number").val();
    var isNum = /^[0-9]+$/;
    if (number.length == 0) {
        $("#numberErr").show();
        $("#numberErr").text("Please enter the number");
        return false;
    }
    if (number.match(isNum)) {
        if (number.length < 10) {
            $("#numberErr").show();
            $("#numberErr").text("Minimum 10 numbers needed");
            return false;
        }
        else if (number.length > 10) {
            $("#numberErr").show();
            $("#numberErr").text("Only 10 numbers allowed");
            return false;
        }
        else if (number.length == 10) {
            $("#numberErr").hide();
            return true;
        }
    }
    else {
        $("#numberErr").show();
        $("#numberErr").text("Please enter the number");
        return false;
    }
})
const nameCheck = (() => {
    let name = $("#name").val();
    name = name.replace(/  +/g, ' ');
    var reg_exp = /^[A-Za-z0-9 ]+$/;
    var is_valid = reg_exp.test(name);
    $("#name").val(name);
    if (name.length == 0) {
        $("#nameErr").show();
        $("#nameErr").text("Please enter the name");
        return false;
    }
    else if (name.charCodeAt(0) == 32) {
        $("#nameErr").show();
        $("#nameErr").text("First letter not be a space");
        return false;
    }
    else if (/\s$/.test(name)) {
        $("#nameErr").show();
        $("#nameErr").text("Last letter not be a space");
        return false;
    }
    else if (!is_valid) {
        $("#nameErr").show();
        $("#nameErr").text("Only characters allowed");
        return false;
    }
    else if (name.length >= 4 && name.length <= 12) {
        var hasNumber = /\d/;
        if (hasNumber.test(name)) {
            $("#nameErr").show();
            $("#nameErr").text("Only characters allowed");
            return false;
        }
        else {
            $("#nameErr").hide();
            return true;
        }
    }
    else if (name.length > 12) {
        $("#nameErr").show();
        $("#nameErr").text("Maximum 12 character allowed");
        return false;
    }
    else {
        $("#nameErr").show();
        $("#nameErr").text("Minimum 4 characters needed");
        return false;
    }
})
$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('.back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
});