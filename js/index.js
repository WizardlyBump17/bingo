const WORDS = []
const GENERATED_AMOUNT = {}
let WORD_TYPES = []
const LIST = 'words'
const EXTRA = 'extra'
const FILES = 'files'

function createWordType(type, words) {
    return {
        'type': type,
        'words': words
    }
}

function createWord() {
    if (WORD_TYPES.length === 0) {
        extraText('Acabou')
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

function generate() {
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

function clearWords() {
    WORDS.splice(0)
    WORD_TYPES.splice(0)
    updateWords()
    extraText('')
    for (let type in GENERATED_AMOUNT)
        GENERATED_AMOUNT[type] = 0
}

function updateWords() {
    const list = document.getElementById(LIST)
    list.innerHTML = ''

    for (let word of WORDS)
        list.appendChild(word.html);
}

function extraText(text) {
    document.getElementById(EXTRA).innerText = text
}

function loadWords() {
    const files = document.getElementById(FILES).files
    if (!files || files.length === 0) {
        extraText('Nenhum arquivo selecionado')
        return
    }

    const file = files[0]
    const reader = new FileReader()
    reader.onload = e => {
        const text = e.target.result
        loadWordsFromText(text)
    }
    reader.readAsText(file)
}

function loadWordsFromText(text) {
    for (let line of text.split('\n')) {
        const data = line.split('\:')
        const type = data[0]
        const words = data[1].trim().split(',')

        WORD_TYPES.push(createWordType(type, words))
    }
}

function uploadWords() {
    document.getElementById(FILES).click()
}