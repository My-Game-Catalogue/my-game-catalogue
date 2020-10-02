const baselink = 'http://localhost:3000'

let newsGlobal = []

$(document).ready(() => {
    checkLogin()
})

// LOGIN

function checkLogin() {
    if(localStorage.token) {
        $('#login-page').hide()
        $('#register-page').hide()
        $('#game-page').show()
        $('#news-page').show()
        fetchGames()
        fetchNews()
    } else {
        $('#login-page').show()
        $('#register-page').hide()
        $('#game-page').hide()
        $('#news-page').hide()
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
      console.log('abc')
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

// GAMES

function fetchGames(event) {
  if (event) event.preventDefault()
  const search = $('#game-search').val()
  const gameContainer = $('#game-container')

  $.ajax({
    url: `${baselink}/games?search=${search || ""}`,
    method: "get",
    headers: {
      token: localStorage.token 
    }
  })
  .done(data => {
    gameContainer.empty()
    console.log(data)
    data.games.forEach(game => {
      gameContainer.append(`
        <div onclick="showDetailGame(${game.id})" class="card m-3 shadow card-game" role="button">
          <img class="card-img-top image-thumbnail" src="${game.image}" alt="game thumbnail">
          <div class="card-body">
            <h5 class="card-title">${game.name}</h5>
            <p class="card-text">Released: ${game.released}</p>
          </div>
        </div>
      `)
    });
  })
  .fail(err => {
    showErrorToastMessage(err.responseJSON.errors.join(', '))
  })
}

function showDetailGame(gameId) {
  $.ajax({
    url: `${baselink}/games/${gameId}`,
    method: "get",
    headers: {
      token: localStorage.token 
    }
  })
  .done(data => {
    const game = data.game

    Swal.fire({
      imageUrl: `${game.image}`,
      imageHeight: 300,
      imageAlt: 'A tall image',
      title: `${game.name}`,
      html: `<p>${game.description}</p>`,
    })

  })
  .fail(err => {
    console.log(err)
    console.log(err.responseJSON)
    showErrorToastMessage(err.responseJSON.errors.join(', '))
  })

}


//NEWS
function fetchNews(event) {
  if (event) event.preventDefault()
  const newsContainer = $('#news-container')
  $.ajax({
    url: `${baselink}/news`,
    method: "get",
    headers: {
      token: localStorage.token 
    }
  })
  .done(data => {
    newsContainer.empty()
    newsGlobal = data.news
    data.news.forEach((news,index) => {
      newsContainer.append(`
        <div onclick="showDetailNews(${index})" class="card m-3 shadow card-game" role="button">
          <img class="card-img-top image-thumbnail" src="${news.urlToImage}" alt="game thumbnail">
          <div class="card-body">
            <h5 class="card-title">${news.title}</h5>
            <p class="card-text">Author: ${news.author}</p>
          </div>
        </div>
      `)
    });
  })
  .fail(err => {
    showErrorToastMessage(err.responseJSON.errors.join(', '))
  })
}

function showDetailNews(idx) {
  let news = newsGlobal[idx]
  Swal.fire({
    imageUrl: `${news.urlToImage}`,
    imageHeight: 300,
    imageAlt: 'A tall image',
    title: `${news.title}`,
    html: `<p>${news.description}</p>`,
  })
}

// MESSAGE

function showErrorToastMessage(message) {
  Swal.fire({
    position: 'top',
    icon: 'error',
    toast: true,
    title: message,
    showConfirmButton: false,
    timer: 3000
  })
}
