// after word is grabbed from dictionary
//   display, 'You have {{word.length}} guesses left'
//   display, _ _ _ _ _ _ _ _ <--  word.length number of 'underscore + space'
//   letters guessed starts as zero and adds the guessed letter to list
//   guesses left increments down to zero with each guess

// with each guess...
//

// Rules
//   As correct letter is guessed, it replaces _ with correct letter(s)
//   form should be validated to make sure only 1 letter is sent - otherwise display message that guess is invalid
//   Only lose a turn when they guess incorrectly (not if duplicate or correct)
//   if they guess same letter twice, display message that they have already guessed that letter and try again.
//   game ends: out of guesses or word is correct
//   game ends: ask if they want to play again. If yes, game restarts

// let eachGuess = document.querySelector('output')
