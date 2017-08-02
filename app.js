const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const jsonfile = require('jsonfile')
const fs = require('file-system')

const app = express()

app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
)

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
const words = fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n')
let word = words[Math.floor(Math.random() * words.length)]
let wordLength = word.length
let wordBlanks = []
let blanks = '_'
let letters = word.split('')

while (wordLength > wordBlanks.length) {
  wordBlanks.push(blanks)
}

app.get('/', (req, res) => {
  res.render('home', {
    guessedLetters: guessedLetters,
    guessCount: guessCount,
    guessCountMessage: guessCountMessage,
    wordBlanks: wordBlanks,
    word: word
  })
  console.log(word)
  console.log(letters)
})

app.get('/lose', (req, res) => {
  res.render('lose', {
    word: word
  })
})

app.post('/lose', (req, res) => {
  res.render('/')
})

app.post('/', (req, res) => {
  let guess = { guess: req.body.guess }
  let letter = req.body.guess

  ////////////
  //
  if (guessedLetters.includes(letter)) {
    console.log('That is right')
    res.redirect('/')
  } else if (letters.includes(letter)) {
    for (let i = 0; i < letters.length; i++) {
      if (letters[i] === letter) {
        console.log(letter + ' is in array')
        wordBlanks[i] = letter
      } else {
        console.log(letter + ' is not in array')
        console.log(guessCount - 1)
        guessCountMessage = 'You have ' + guessCount + ' guesses remaining.'
      }
      // }
    }
  } else {
    guessCount--
    if (guessCount === 0) {
      res.redirect('/lose')
      console.log('You lose.')
    }
  }

  /////////////////

  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === letter) {
      console.log(letter + ' is in array')
      wordBlanks[i] = letter
    } else {
      console.log(letter + ' is not in array')
      console.log(guessCount - 1)
      guessCountMessage = 'You have ' + guessCount + ' guesses remaining.'
    }
  }

  //
  // if (letter.length > 1) {
  //   console.log('Guess is too long. Try again.')
  //   guessCountMessage = 'Guess is too long. Try again.'
  // }

  guessedLetters.push({ guess: req.body.guess })
  console.log(guessedLetters)
  id++

  if (id === 8) {
    console.log('Sorry, you are out of guesses')
  }

  res.redirect('/')
})

app.listen(3000, function() {
  console.log('Listening on 3000')
})
