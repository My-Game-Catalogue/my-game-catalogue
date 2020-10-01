const baselink = 'http://localhost:3000'

$(document).ready(function() {
  fetchGames()
})

function fetchGames(event) {
  if (event) event.preventDefault()
  const search = $('#game-search').val()
  const gameContainer = $('#game-container')
  console.log(search)
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
    // console.log(err)
    // console.log(err.responseJSON)
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
      confirmButtonText: `Favorite`,
      denyButtonText: `Unfavorite`,
      showDenyButton: true,
      showCancelButton: true,
      title: `${game.name}`,
      html: `<p>${game.description}</p>`,
      
      
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  })
  .fail(err => {
    console.log(err)
    console.log(err.responseJSON)
    showErrorToastMessage(err.responseJSON.errors.join(', '))
  })

}

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

