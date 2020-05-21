const titleEl = document.querySelector('#note-title')
const bodyEl = document.querySelector('#note-body')
const removeEl = document.querySelector('#remove-note')
const applyEl = document.querySelector('#apply-note')
const dateEl = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)  // פונה אל הסטרינג שאחרי הסולמית בקישור ומקבל את הסטרינג מהאינדקס שהוגדר ועד האינדקס שהוגדר אחרי הפסיק, בצורה כזו
                                           // location.hash.substring(1, 3) - ידפיס את הסטרינג מאינדקס 1 ועד 3 לא כולל
let notes = getSavedNotes()
let note = notes.find((note) => {
    return note.id === noteId
})

if (!note) {
    location.assign('/index.html')
}

titleEl.value = note.title
bodyEl.value = note.body
dateEl.textContent = generateLastEdited(note.updatedAt)

titleEl.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateEl.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

bodyEl.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateEl.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

removeEl.addEventListener('click', () => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

applyEl.addEventListener('click', () => {
    note.updatedAt = moment().valueOf()
    dateEl.textContent = generateLastEdited(note.updatedAt)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find(function (note) {
            return note.id === noteId
        })
        
        if (!note) {
            location.assign('/index.html')
        }

        titleEl.value = note.title
        bodyEl.value = note.body
    }
})