export {
    WORD_TYPES,
    FILES
}

const WORD_TYPES = []
const FILES = 'files'

window.createWordType = (type, words) => {
    return {
        'type': type,
        'words': words
    }
}

window.loadWords = () => {
    const files = document.getElementById(FILES).files
    if (!files || files.length === 0) {
        alert('Nenhum arquivo selecionado')
        return
    }

    if (WORD_TYPES.length !== 0) {
        alert('Palavras já carregadas')
        return
    }

    const file = files[0]
    const reader = new FileReader()
    reader.onload = e => {
        const text = e.target.result
        loadWordsFromText(text)
    }
    reader.onerror = () => alert('Erro ao ler arquivo')
    reader.readAsText(file)
}

window.loadWordsFromText = (text) => {
    for (let line of text.split('\n')) {
        const data = line.split('\:')
        const type = data[0]
        const words = data[1].trim().split(',')

        WORD_TYPES.push(createWordType(type, words))
    }

    alert('Palavras carregadas')
}

window.uploadWords = () => {
    document.getElementById(FILES).click()
}
