import {WORD_TYPES,} from './global.js'

const WIDTH = 5
const HEIGHT = 5
const CARDS = 'cards'
const GENERATE_AMOUNT = 'generate-amount'

window.generate = () => {
    const generateAmount = document.getElementById(GENERATE_AMOUNT).value
    for (let i = 0; i < generateAmount; i++)
        generateOne()
}

function generateOne() {
    const words = WORD_TYPES.map(type => type.words).flat()

    const div = document.createElement('div')
    div.classList.add('card')

    const title = document.createElement('h2')
    title.classList.add('title')
    title.innerText = 'BINGO GRAMATICAL'
    div.appendChild(title)

    const list = document.createElement('ul');
    div.appendChild(list)

    const selectedWords = []

    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            if (selectedWords.length === words.length)
                break

            const element = document.createElement('li')
            element.classList.add('word')

            let word = words[(Math.random() * (words.length - 1)).toFixed(0)];

            while (selectedWords.includes(word)) {
                word = words[(Math.random() * (words.length - 1)).toFixed(0)];
                console.log('a')
            }

            element.innerText = `${word}`
            selectedWords.push(word)

            list.appendChild(element)
        }
        const breakLine = document.createElement('div');
        breakLine.classList.add('break')
        list.appendChild(breakLine)
    }

    document.getElementById(CARDS).appendChild(div)
}