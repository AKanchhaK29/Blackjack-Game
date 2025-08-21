let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""

const messageEl = document.getElementById("message-el")
const sumEl = document.querySelector("#sum-el")
const cardsEl = document.querySelector("#cards-el")
const playerEl = document.querySelector("#player-el")

const player = {
  name: "Player",
  chips: 200
}

function updatePlayerInfo() {
  playerEl.textContent = `${player.name}: $${player.chips}`
}
updatePlayerInfo()

// Generate a random card value (1–13)
function getRandomCard() {
  const randomNum = Math.floor(Math.random() * 13) + 1
  if (randomNum === 1) {
    return 11  // Ace
  } else if (randomNum > 10) {
    return 10  // Jack, Queen, King
  } else {
    return randomNum
  }
}

// Start the game with two cards
function startGame() {
  if (player.chips <= 0) {
    messageEl.textContent = "You’re out of chips! 💸"
    return
  }

  isAlive = true
  hasBlackJack = false
  const card1 = getRandomCard()
  const card2 = getRandomCard()
  cards = [card1, card2]
  sum = card1 + card2
  renderGame()
}

// Render cards, sum, and game messages
function renderGame() {
  cardsEl.textContent = "Cards: " + cards.join(" ")
  sumEl.textContent = "Sum: " + sum

  if (sum <= 20) {
    message = "Do you want to draw a new card?"
  } else if (sum === 21) {
    message = "Wohoo! You've got Blackjack! 🎉"
    hasBlackJack = true
    player.chips += 50   // reward for winning
  } else {
    message = "You are out of the game! ❌"
    isAlive = false
    player.chips -= 50   // penalty for losing
  }

  messageEl.textContent = message
  updatePlayerInfo()
}

// Draw a new card (only if player is still in the game)
function newCard() {
  if (isAlive && !hasBlackJack) {
    const card = getRandomCard()
    sum += card
    cards.push(card)
    renderGame()
  }
}

// Reset game but keep chips
function resetGame() {
  cards = []
  sum = 0
  hasBlackJack = false
  isAlive = false
  message = "Want to play a round?"
  messageEl.textContent = message
  cardsEl.textContent = "Cards: "
  sumEl.textContent = "Sum: "
}