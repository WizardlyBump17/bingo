const WORDS = randomWords()
const WIDTH = 5
const HEIGHT = 5
const CARDS = 'cards'

function randomWords() {
    const words = []
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < 100; i++) {
        let word = ''
        const minSize = 3
        const maxSize = 20
        const size = (Math.random() * (maxSize - minSize) + minSize).toFixed(0)
        for (let j = 0; j < size; j++)
            word += letters[(Math.random() * (letters.length - 1)).toFixed(0)]
        words.push(word)
    }
    return words
}

function generate() {
    const div = document.createElement('div')
    div.classList.add('card')

    const title = document.createElement('h2')
    title.classList.add('title')
    title.innerText = 'BINGO GRAMATICAL'
    div.appendChild(title)

    const list = document.createElement('ul');
    div.appendChild(list)

    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            const element = document.createElement('li')
            element.classList.add('word')
            element.innerText = `${WORDS[(Math.random() * (WORDS.length - 1)).toFixed(0)]}`
            list.appendChild(element)
        }
        const breakLine = document.createElement('div');
        breakLine.classList.add('break')
        list.appendChild(breakLine)
    }

    document.getElementById(CARDS).appendChild(div)
}