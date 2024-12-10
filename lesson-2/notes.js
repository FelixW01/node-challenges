// ES6 syntax for importing
import fs from 'fs'
import chalk from 'chalk'

const getNotes = (() => 'Your notes')

const addNote =  (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    // chome//inspect
    // node --inspect-brk app.js add --title="Courses" --body="Node.js" --inspect-brk triggers the chrome node debugger
    // debugger
    
    if (!duplicateNote) {
    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)
    console.log('New Note Added!')
    } else {
    console.log('Note title taken!')
  }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)  => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }

    saveNotes(notesToKeep)
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

// es6 syntax for module exports
export default {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}