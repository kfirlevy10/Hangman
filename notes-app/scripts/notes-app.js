'use strict'

const notes = getSavedNotes()

const filters = {
    searchText: '',
    soryBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => { // המשתנה בא לידי ביטוי בלחיצה על הכפתור (במקרה זה)ג.event הפונקציה מקבלת משתנה שנהוג לקרוא לו 
     const id = uuidv4()
     const now = moment().valueOf()
     notes.push({
         id: id,                          //(חדש בכל פעם שהיא נטענת id הספרייה מספקת) לכל פתק תהיה תז משלו 
         title:'',
         body:'',
         createdAt: now,
         updatedAt: now
     })
     saveNotes(notes)
     location.assign(`/edit.html#${id}`)             // כשהמשתמש ילחץ על הכפתור, הוא יועבר אוטומטית ללינק המצורף, בו יערוך את הפתק
})

document.querySelector("#search-text").addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {          // משתנה באחד החלונות האחרים באפליקציה localStorageזה אירוע שמתרחש כאשר נתון כלשהו ב storage
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})         





//-- Single --
// p
// #replace - id-מתייחס ל #
// .item -  class-מתייחס ל . 

//-- Multiple --
// p#order
// button.inventory
// h1#title.application
// h1.application#title - עצמו יהיה ראשוןtagבא קודם, העיקר שהid או הclass לא חשוב אם ה