import {WORD_TYPES} from "./global.js";

const WORDS = []
const GENERATED_AMOUNT = {}
const LIST = 'words'
const SEARCH = 'search'
const SEARCH_RESULT = 'search-result'
let clearWordDelay = Date.now()

window.createWord = () => {
    if (WORD_TYPES.length === 0) {
        alert('Acabaram as palavras')
        return undefined
    }

    const random = Number.parseInt((Math.random() * (WORD_TYPES.length - 1)).toFixed(0));
    const type = WORD_TYPES[random]

    const word = {
        'type': type
    }

    const element = document.createElement('li')

    const typeElement = document.createElement('h4')
    typeElement.innerText = type.type
    element.appendChild(typeElement)

    const wordsElement = document.createElement('p')
    wordsElement.innerText = type.words.join(', ')
    element.appendChild(wordsElement)

    word.html = element

    return word
}

window.generate = () => {
    const word = createWord();
    if (!word)
        return

    WORDS.push(word)
    updateWords()

    const type = word.type.type
    if (GENERATED_AMOUNT[type])
        GENERATED_AMOUNT[type]++
    else
        GENERATED_AMOUNT[type] = 1

    const index = WORD_TYPES.findIndex(t => t.type === type);
    const wordType = WORD_TYPES[index]
    if (GENERATED_AMOUNT[type] >= wordType.words.length)
        WORD_TYPES.splice(index, 1)
}

window.clearWords = () => {
    if (Date.now() > clearWordDelay + 500) {
        clearWordDelay = Date.now()
        return
    }

    WORDS.splice(0)
    WORD_TYPES.splice(0)
    updateWords()
    for (let type in GENERATED_AMOUNT)
        GENERATED_AMOUNT[type] = 0
}

window.updateWords = () => {
    const list = document.getElementById(LIST)
    list.innerHTML = ''

    for (let word of WORDS)
        list.appendChild(word.html);
}

window.searchSelected = () => {
    const text = document.getElementById(SEARCH).value
    if (!text)
        return

    const result = document.getElementById(SEARCH_RESULT)
    const found = []

    for (let word of WORDS) {
        for (let storedWord of word.type.words) {
            if (text.trim().toLowerCase() !== storedWord.trim().toLowerCase())
                continue

            found.push(word.type.type)
        }
    }

    if (found.length === 0) {
        result.innerText = 'NÃO'
        result.style.backgroundColor = 'rgb(255, 0, 0)'
        result.style.display = 'block'
        return;
    }

    result.innerText = found.filter((s, i) => found.indexOf(s, i + 1) === -1).map(s => s.toUpperCase()).join(', ')
    result.style.backgroundColor = 'rgb(0, 181, 0)'
    result.style.display = 'block'
}