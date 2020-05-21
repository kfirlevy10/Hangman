// Get saved todos
const getSavedTodos = () => {
  try {
   const todosJSON = localStorage.getItem('todos')
   return todosJSON !== null ? JSON.parse(todosJSON) : []
  } catch (e) {
    return []
  }

}

// Toggle the 'done' value for a given todo
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id
  )

  if (todo) {
    todo.done = !todo.done
  }
}
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id)
  if (todoIndex > -1) {
    todos.splice (todoIndex, 1)
  }

}
// Generate todo DOM element
const generateDomElement = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const textEl = document.createElement('span')
    const checkbox = document.createElement('input')
    const button = document.createElement('button')
    
    // Setup the checkbox
    checkbox.setAttribute('type', 'checkbox')
    containerEl.appendChild(checkbox)
    checkbox.checked = todo.done
    checkbox.addEventListener('change', () => {
      toggleTodo(todo.id)
      saveTodos(todos)
      renderTodos(todos, filters)
    })

    // Setup todo text
    textEl.textContent = todo.text
    containerEl.appendChild(textEl)
    
    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup the remove button
    todoEl.appendChild(button)
    button.textContent = 'x'
    button.classList.add('button', 'button--text')
    button.addEventListener('click', () => {
      removeTodo(todo.id)
      saveTodos(todos)
      renderTodos(todos, filters)
    })
  
    return todoEl
}

// Render todos
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos')
    const filteredTodos = todos.filter((todo) => {
    const filterByText = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    const filterByIsntDone = !filters.hideCompleted || !todo.done

    return filterByText && filterByIsntDone
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.done)
    
    todoEl.innerHTML = ''
    todoEl.appendChild(summary(incompleteTodos))
    
    if(filteredTodos.length > 0) {
      filteredTodos.forEach((todo) => {  
        todoEl.appendChild(generateDomElement(todo))
      })
    }
    else
    {
      const emptyMessage = document.createElement('p')
      emptyMessage.classList.add('empty-message')
      emptyMessage.textContent = 'You have nothing to do.'
      todoEl.appendChild(emptyMessage)
    }
    
}

// Clear todos
const clearTodos = (todos) => {
  localStorage.clear()
  for(let i=todos.length; i>=0; i--){
    todos.pop()
  }
  return todos
}

// Save todos to local storage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Generate summary DOM
const summary = (incompleteTodos) => {
 const summaryEl = document.createElement('h2')
 const plural = incompleteTodos.length === 1 ? '' : 's'
 summaryEl.classList.add('list-title')
 summaryEl.textContent = `You have ${incompleteTodos.length} to-do${plural} left.`
 return summaryEl
}
