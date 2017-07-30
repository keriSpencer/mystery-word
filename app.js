const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')

const app = express()
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let guessCount = 8
let guessCountMessage = 'You have ' + guessCount + ' guesses remaining.'
let id = 0
let loseMessage = 'Sorry, you are out of guesses'
let guessedLetters = []

app.get('/', (req, res) => {
  res.render('home', { guessedLetters: guessedLetters, guessCount: guessCount, guessCountMessage: guessCountMessage })
})

app.post('/', (req, res) => {
  guessedLetters.push({ guess: req.body.guess })
  id++
  if (guessCount === 1) {
    guessCountMessage = 'You lose! You are out of guesses'
  } else if (guessCount === 2) {
    guessCount--
    guessCountMessage = 'You have ' + guessCount + ' guess remaining.'
  } else {
    guessCount--
    guessCountMessage = 'You have ' + guessCount + ' guesses remaining.'
  }
  console.log(id)
  if (id === 8) {
    console.log('Sorry, you are out of guesses')

    //   res.render('/lose')
    // } else {
    //   console.log(req.body.guess)
    // res.render('home', { guessedLetters: guessedLetters })
  }
  res.redirect('/')
})

app.listen(3000, function() {
  console.log('Listening on 3000')
})
