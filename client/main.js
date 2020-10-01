const baselink = 'http://localhost:3000'


$(document).ready(() => {
    checkLogin()
})


function checkLogin() {
    if(localStorage.token) {
        $('#login-page').show()
        $('#register-page').hide()
    } else {
        $('#login-page').show()
        $('#register-page').hide()
        $('#login-email').val('')
        $('#login-password').val('')
        $('#register-email').val('')
        $('#register-password').val('')
    }
}

function login(event) {
    event.preventDefault()
    let email = $("#login-email").val()
    let password = $("#login-password").val()

    $.ajax({
        url: `${baselink}/login`,
        method: "post",
        data: {
            email,
            password
        }
    })
    .done(data => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login Success',
            showConfirmButton: false,
            timer: 1500
          })
        localStorage.setItem("token", data.token)
        checkLogin()
    })
    .fail(err => {
        console.log(err.responseJSON.errors, '>>>>>> error')
        Swal.fire(
            'Error',
            err.responseJSON.errors.join(', '),
            'error'
          )
    })
    .always(() => {
        $('#login-email').val('')
        $('#login-password').val('')
    })
}

function toLoginPage() {
    checkLogin()
    $('#register-page').hide()
    $('#login-page').show()
}

function toRegisterPage() {
    checkLogin()
    $('#register-page').show()
    $('#login-page').hide()
}

function register(event) {
    event.preventDefault()
    let name = $('#register-name').val()
    let email = $("#register-email").val()
    let password = $("#register-password").val()

    $.ajax({
        url: `${baselink}/register`,
        method: "post",
        data: {
            name,
            email,
            password
        }
    })
    .done(data => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Register Success',
            showConfirmButton: false,
            timer: 1500
          })
        checkLogin()
    })
    .fail(err => {
        console.log(err.responseJSON, '>>>>>> error')
        Swal.fire(
            'Error',
            err.responseJSON.errors.join(', '),
            'error'
          )
    })
    .always(() => {
        $('#register-name').val('')
        $('#register-email').val('')
        $('#register-password').val('')
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: `${baselink}/googleSign`,
        method: "post",
        data: {
            id_token
        }
    })
    .done(data => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login Success',
            showConfirmButton: false,
            timer: 1500
          })
        localStorage.setItem("token", data.token)
        checkLogin()
    })
    .fail(err => {
        console.log(err)
    })
}

function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.clear()
    checkLogin()
}





