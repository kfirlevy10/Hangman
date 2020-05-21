'use strict'

let todos = getSavedTodos ()

const filters = {
  searchText: '',
  hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#clear-all').addEventListener('click', (e) => {
  
  renderTodos(clearTodos(todos), filters)
})

document.querySelector('#filter-input').addEventListener('input', (e) => {
  filters.searchText = e.target.value
  renderTodos(todos, filters)
})

document.querySelector('#add-todo').addEventListener('submit', (e) => {
  const text = e.target.elements.addTodo.value.trim()
  e.preventDefault()  // the default makes the browser change url with each submission
  todos.push({
    id: uuidv4(),
    text,             // same as typing text: text (when a property's value comes from a valuable of the same name, the syntax can look like this)
    done: false
  })

  if(text.length > 0) {
    saveTodos(todos)
    renderTodos(todos, filters)
  }

  e.target.elements.addTodo.value = ''
  
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
  filters.hideCompleted = e.target.checked
  renderTodos(todos, filters)
})