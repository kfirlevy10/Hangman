// HTTP - Hypertext Transfer Protocol (already used by application)
// Request - What do we want to do
// Response - What was actually done
const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')
let game1

window.addEventListener('keypress', (e) => {  //each key has its own code
    const guess = String.fromCharCode(e.charCode)   // converts the chars codes into actual letters
    game1.makeGuess(guess)
    render()
})

const render = () => {
    puzzleEl.innerHTML = ''
    guessesEl.innerHTML = game1.statusMessage

    game1.puzzle.split('').forEach((letter) => {
        const letterEl = document.createElement('span')
        letterEl.textContent = letter
        if(letter === ' ') {
            letterEl.classList.add("space")
        }
        puzzleEl.appendChild(letterEl)
    })
}

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    game1 = new Hangman(puzzle, 5)
    render()
}

startGame()

document.querySelector('#reset').addEventListener('click', startGame)

/*getPuzzle('2').then((puzzle) => {   
        console.log(puzzle)
    }).catch((err) => {
        console.log(err)
    })

getCountry('IL').then((country) => {
    console.log(country.name)
}).catch((err) => {
    console.log(err)
})

getLocation().then((location) => {
    return getCountry(location.country)
}).then((country) => {
    console.log(`You live in ${country.name}`)
}).catch((err) => {
    console.log(err)
})*/

/* getCurrentCountry().then((country) => {
    console.log(country.name)
}).catch((err) => {
    console.log(err)
})*/

