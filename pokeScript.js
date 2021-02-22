app = {
  Owen: 0,
  Esther: 0
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
  }
  $('#selector').on('click', () => {
    $('.pokemon').addClass('fadeOut')
    app.currentPokemon = app.randomPokemon()
    setTimeout(()=>updateContent(),1100)
  })
  $('.pokeName').on('click', () => {
    $('.name').toggleClass('hidden')
  })
}

app.scoreKeeping = () => {
  $('.score1').on('click', () => {
    app.Owen += 1
    $('.score1Tally').text(app.Owen)
  })
  $('.score2').on('click', () => {
    app.Esther += 1
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