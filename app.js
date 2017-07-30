const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')

const app = express()
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let id = 0
let loseMessage = 'Sorry, you are out of guesses'
let guessedLetters = []

app.get('/', (req, res) => {
  res.render('home', { guessedLetters: guessedLetters })
})

app.post('/', (req, res) => {
  guessedLetters.push({ guess: req.body.guess })
  id++
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
