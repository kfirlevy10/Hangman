class Hangman {
    constructor(word, remainingGuesses) {
       this.word = word.toLowerCase().split('')  // Breaks the string into an array
       this.remainingGuesses = remainingGuesses
       this.guessedLetters = []
       this.status = 'playing'
    }
    calculateStatus() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')
        if(this.remainingGuesses === 0) {
            this.status = 'failed'
        }
        else if (finished) {
            this.status = 'finished'
        }
        else {
            this.status = 'playing'
        }     
    }
    get statusMessage() {
        if (this.status === 'playing') {
            return `${this.remainingGuesses} guesses remaining.` 
        }
        else if(this.status === 'finished') {
            return 'Congratulations! You have finished the game.'
        }
        else {
            return `You failed. The word was "${this.word.join('')}".`  // Joins the array attributes into a string
        }
    }
    get puzzle() {
        let puzzle = ''
     
        this.word.forEach((letter) => {
          if (this.guessedLetters.includes(letter) || letter === ' ') {
              puzzle += letter
          } else {
              puzzle += '*'
          }
    
        })

        return puzzle  
    }
    makeGuess(guess) {
        const badGuessesEl = document.querySelector('#bad-guesses')
        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)
        if (this.status !== 'playing') {
            return
        }
        if(isUnique) {
            this.guessedLetters.push(guess)
        }
    
        if(isUnique && isBadGuess) {
            this.remainingGuesses-- // x = x - 1
            badGuessesEl.textContent +=  `${guess.toUpperCase()} `
        }
        document.querySelector('#reset').addEventListener('click', () => {
            setTimeout (() => {
                badGuessesEl.textContent = 'Bad guesses: '
            }, 230) 
        })
        this.calculateStatus()
    }

}


 





