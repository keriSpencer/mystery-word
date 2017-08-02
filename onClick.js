let returnHome = document.querySelector('div')

let clickButton = function() {
  res.redirect('home')
}

let homeButton = document.querySelector('button')
homeButton.id = 'homeButton'
homeButton.innerHTML = 'Play Again?'
homeButton.addEventListener('click', clickButton)
returnHome.appendChild(homeButton)
