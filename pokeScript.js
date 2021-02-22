app = {
  Owen: 0,
  Esther: 0,
  goNext: true
}

app.pullJSON = () => {
  $.ajax({
    url: './json/pokebabies.json',
    method: 'GET',
    dataType: 'json'
  }).then(res => {
    app.pokeData = res.pokemon
  })
}

app.randomPokemon = () => {
  const randKey = Math.floor(Math.random() * app.pokeData.length),
    pickedKey = app.pokeData[randKey]
  app.pokeData.splice(randKey, 1)
  return pickedKey
}

app.pickNew = () => {
  app.currentPokemon = {}
  const updateContent = () => {
    $('.sidebar').removeClass('removed')
    $('.pokeName').html(`<h2 class="hidden name">${app.currentPokemon.name}</h2>`)
    $('.pokeImage').html(`
      <img class="pokemonImage" src=${app.currentPokemon.img}>
      <img class="glowLeft glow" src="./assets/glow.png">
      <img class="glowRight glow" src="./assets/glow.png">
    `)
    $('.pokeTypes').html(
      app.currentPokemon.type.map((value) => {
        return `<span class="${value} type">${value}</span>`
      })
    )
    $('.pokeDesc').text(app.currentPokemon.description)
    $('.pokemon').removeClass('fadeOut')
    app.goNext = false
  }
  $('#selector').on('click', () => {
    if (app.goNext) {
      $('.pokemon').addClass('fadeOut')
      app.currentPokemon = app.randomPokemon()
      setTimeout(() => updateContent(), 1100)
    }
  })
  $('.pokeName').on('click', () => {
    if (!app.goNext) {
      $('.name').toggleClass('hidden')
      app.goNext = true
    }
  })
}

app.scoreKeeping = () => {
  const scoreCheck = () => {
    if (app.Owen > app.Esther) {
      $('#score1').addClass('greenScore')
      $('#score2').addClass('redScore')
      console.log('owen higher')
    } else if (app.Owen < app.Esther) {
      $('#score1').addClass('redScore')
      $('#score2').addClass('greenScore')
      console.log('esther higher')
    } else {
      $('#score1').removeClass(['greenScore','redScore'])
      $('#score2').removeClass(['greenScore','redScore'])
      console.log('tie')
    }
  }
  $('.score1').on('click', () => {
    app.Owen += 1
    scoreCheck()
    $('.score1Tally').text(app.Owen)
  })
  $('.score2').on('click', () => {
    app.Esther += 1
    scoreCheck()
    $('.score2Tally').text(app.Esther)
  })
}

app.init = () => {
  app.pullJSON()
  app.pickNew()
  app.scoreKeeping()
}

$(() => {
  app.init()
})